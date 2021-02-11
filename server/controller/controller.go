package controller

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Pong tests that api is working
func Pong(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"ping": "pong"})
}

func SendBird(c *gin.Context) {
	// single file
	file, _ := c.FormFile("file")
	log.Println(file.Filename)

	// Upload the file to specific dst.
	// c.SaveUploadedFile(file, dst)

	c.String(http.StatusOK, fmt.Sprintf("'%s' uploaded!", file.Filename))
}
