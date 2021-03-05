package controller

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/komfy/cloudinary"
)

// Pong tests that api is working
func Pong(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"ping": "pong"})
}

// SendBirdImage uploads image to Cloudinary and then sends url to Flask API
func SendBirdImage(c *gin.Context) {
	cloudinaryURL := os.Getenv("CLOUDINARY_URL")
	if cloudinaryURL == "" {
		log.Fatalln("there is no env variable with given name")
	}
	cloudService, err := cloudinary.NewService(cloudinaryURL)
	if err != nil {
		HandleErr(c, err)
	}

	fileHeader, _ := c.FormFile("file")

	file, err := fileHeader.Open()
	if err != nil {
		HandleErr(c, err)
	}

	uploadResponse, err := cloudService.Upload(fileHeader.Filename, file, false)
	if err != nil {
		HandleErr(c, err)
	}

	c.JSON(http.StatusOK, gin.H{
		"file":                  fileHeader.Filename,
		"cloudinary_upload_url": uploadResponse.URL,
	})
}

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

// MockSendBird receives url to send to Flask API
func MockSendBird(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"id":          200,
		"image_url":   "img_url",
		"name":        "Common Yellowthroat",
		"description": "Exhibits relatively deep mtDNA separations between populations in Washington and those in the central and eastern states (Ball and Avise 1992). Populations around Lake Chapala, Jalisco, regarded as a distinct group, <i>Chapalensis</i> (AOU 1998). Sometimes regarded as conspecific with <i>G. rostrata, G. flavovelata, and G. beldingi</i> (AOU 1983). Further study required of species relationships with <i>Geothlypis</i> (AOU 1998).",
	})
}
