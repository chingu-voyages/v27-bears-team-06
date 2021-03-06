package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

// SendBird receives url to send to Flask API
func SendBird(c *gin.Context) {
	var bird Bird
	var prediction Prediction
	var natureServeData NatureServeAPIResponse
	c.Bind(&bird)

	predictChan := make(chan Prediction)

	go func() {
		err := getPrediction(bird.URL, predictChan)
		if err != nil {
			HandleErr(c, err)
			c.JSON(http.StatusNotFound, gin.H{"success": false, "errors": "Could not retrieve prediction"})
		}
	}()

	prediction = <-predictChan

	natureServeChan := make(chan NatureServeAPIResponse)

	go func() {
		err := getBirdDetails(prediction.Name, natureServeChan)
		if err != nil {
			HandleErr(c, err)
			c.JSON(http.StatusNotFound, gin.H{"success": false, "errors": "Could not retrieve bird details"})
		}
	}()

	natureServeData = <-natureServeChan
	var payload SendBirdPayload

	if len(natureServeData.Results) == 0 {
		payload = SendBirdPayload{
			ID:   prediction.ID,
			Name: prediction.Name,
		}
	} else {
		payload = SendBirdPayload{
			ID:          prediction.ID,
			Name:        prediction.Name,
			SpeciesInfo: natureServeData.Results[0].SpeciesGlobal,
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"msg":     "prediction found",
		"data":    payload,
	})

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
