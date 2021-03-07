package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

// GetBird receives url to send to Flask API
func GetBird(c *gin.Context) {
	url := c.Query("image_url")
	var prediction Prediction
	var natureServeData NatureServeAPIResponse

	predictChan := make(chan Prediction)

	go func() {
		err := getPrediction(url, predictChan)
		if err != nil {
			HandleErr(c, err)
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"success": false, "errors": "Could not retrieve prediction"})
			return
		}
	}()

	prediction = <-predictChan

	natureServeChan := make(chan NatureServeAPIResponse)

	go func() {
		err := getBirdDetails(prediction.Name, natureServeChan)
		if err != nil {
			HandleErr(c, err)
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"success": false, "errors": "Could not retrieve bird details"})
			return
		}
	}()

	natureServeData = <-natureServeChan
	var payload SendBirdPayload

	payload = SendBirdPayload{
		ID:          prediction.ID,
		Name:        prediction.Name,
		SpeciesInfo: natureServeData.Results[0].SpeciesGlobal,
	}

	data := gin.H{
		"success": true,
		"msg":     "prediction found",
		"data":    payload,
	}

	c.JSON(http.StatusOK, data)

}

// GetLocation receives lat,lng to send to eBird API
func GetLocation(c *gin.Context) {
	var data []Location
	lat := c.Query("lat")
	lng := c.Query("lng")
	token := os.Getenv("EBIRD_API_KEY")
	targetURL := fmt.Sprintf("https://api.ebird.org/v2/data/obs/geo/recent?lat=%s&lng=%s", lat, lng)

	client := &http.Client{}
	req, _ := http.NewRequest("GET", targetURL, nil)
	req.Header.Set("x-ebirdapitoken", token)

	response, err := client.Do(req)
	if err != nil {
		HandleErr(c, err)
		c.JSON(http.StatusNotFound, gin.H{"success": false, "errors": "Could not retrieve location details"})
	}

	err = json.NewDecoder(response.Body).Decode(&data)

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"msg":     "location found",
		"data":    data,
	})
}
