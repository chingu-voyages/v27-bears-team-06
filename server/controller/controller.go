package controller

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/komfy/cloudinary"
)

//Bird request from form data
type Bird struct {
	URL string `form:"url"`
	lat int    `form:"lat"`
	lng int    `form:"lng"`
}

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
		log.Fatalln(err)
	}

	fileHeader, _ := c.FormFile("file")

	file, err := fileHeader.Open()
	if err != nil {
		log.Fatalln(err)
	}

	uploadResponse, err := cloudService.Upload(fileHeader.Filename, file, false)
	if err != nil {
		log.Fatalln(err)
	}

	c.JSON(http.StatusOK, gin.H{
		"file":                  fileHeader.Filename,
		"cloudinary_upload_url": uploadResponse.URL,
	})
}

// SendBird receives url to send to Flask API
func SendBird(c *gin.Context) {
	var bird Bird
	c.Bind(&bird)

	c.JSON(200, gin.H{
		"url": bird.URL,
	})
}
