package controller

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/komfy/cloudinary"
)

//Bird request from form data
type Bird struct {
	// ID          int
	// Name        string
	// Description string
	URL         string `form:"url"`
	Lat         int    `form:"lat"`
	Lng         int    `form:"lng"`
	MockRequest bool   `form:"mockRequest"`
}

//Prediction response from api
type Prediction struct {
	id   int
	name string
}

// NatureServeParams for API POST request
type NatureServeParams struct {
	CriteriaType string         `json:"criteriaType"`
	TextCriteria []TextCriteria `json:"textCriteria"`
}

// TextCriteria params for API POST request
type TextCriteria struct {
	ParamType    string `json:"paramType"`
	SearchToken  string `json:"searchToken"`
	MatchAgainst string `json:"matchAgainst"`
	Operator     string `json:"operator"`
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

//checks and prints a message if a website is up or down
func getPrediction(fileURL string, c chan Prediction) {
	baseURL := os.Getenv("FLASK_API_BASE_URL")
	targetURL := baseURL + "/prediect"

	response, err := http.PostForm(targetURL, url.Values{
		"file_url": {fileURL},
	})

	if err != nil {
		log.Fatalln(err)
	}

	defer response.Body.Close()
	body, err := ioutil.ReadAll(response.Body)

	if err != nil {
		log.Fatalln(err)
	}

	fmt.Printf("%s\n", string(body))
	// c <- Prediction{body.id, body.name}

}

//checks and prints a message if a website is up or down
func getBirdDescription(name string, c chan Bird) {
	targetURL := "https://explorer.natureserve.org/api/data/speciesSearch"

	body := &NatureServeParams{
		CriteriaType: "species",
		TextCriteria: []TextCriteria{
			{
				ParamType:    "textSearch",
				SearchToken:  name,
				MatchAgainst: "allNames",
				Operator:     "equals",
			},
		},
	}

	payloadBuf := new(bytes.Buffer)
	json.NewEncoder(payloadBuf).Encode(body)
	req, _ := http.NewRequest("POST", targetURL, payloadBuf)

	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		log.Fatalln(err)
	}

	defer res.Body.Close()

	fmt.Println("response Status:", res.Status)
	// Print the body to the stdout
	io.Copy(os.Stdout, res.Body)
}

// SendBird receives url to send to Flask API
func SendBird(c *gin.Context) {
	var bird Bird
	var prediction Prediction
	// var natureServeData Bird
	c.Bind(&bird)

	c.JSON(http.StatusOK, gin.H{
		"id":          200,
		"image_url":   bird.URL,
		"name":        "Common Yellowthroat",
		"description": "Exhibits relatively deep mtDNA separations between populations in Washington and those in the central and eastern states (Ball and Avise 1992). Populations around Lake Chapala, Jalisco, regarded as a distinct group, <i>Chapalensis</i> (AOU 1998). Sometimes regarded as conspecific with <i>G. rostrata, G. flavovelata, and G. beldingi</i> (AOU 1983). Further study required of species relationships with <i>Geothlypis</i> (AOU 1998).",
	})

	predictChan := make(chan Prediction)
	go getPrediction(bird.URL, predictChan)

	prediction = <-predictChan

	// natureServeChan := make(chan Bird)
	// go getBirdDescription("Common Yellowthroat", natureServeChan)

	// natureServeData = <-natureServeChan

	c.JSON(http.StatusOK, gin.H{
		"id":        prediction.id,
		"image_url": bird.URL,
		"name":      prediction.name,
		// "description": natureServeData,
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
