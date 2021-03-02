package controller

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/komfy/cloudinary"
)

//Bird request from form data
type Bird struct {
	// ID          int
	// Name        string
	// Description string
	URL string `form:"url"`
	Lat int    `form:"lat"`
	Lng int    `form:"lng"`
}

//Prediction response from api
type Prediction struct {
	ID   int
	Name string
}

// NatureServeParams for API POST request
type NatureServeParams struct {
	CriteriaType string         `json:"criteriaType"`
	TextCriteria []TextCriteria `json:"textCriteria"`
}

type SpeciesGlobal struct {
	Synonyms          []string `json:"synonyms"`
	OtherCommonNames  []string `json:"otherCommonNames"`
	Kingdom           string   `json:"kingdom"`
	Phylum            string   `json:"phylum"`
	TaxClass          string   `json:"taxclass"`
	TaxOrder          string   `json:"taxorder"`
	Family            string   `json:"family"`
	Genus             string   `json:"genus"`
	TaxonomicComments string   `json:"taxonomicComments"`
	InformalTaxonomy  string   `json:"informalTaxonomy"`
}
type Result struct {
	SpeciesGlobal SpeciesGlobal `json:"speciesGlobal"`
}

type NatureServeAPIResponse struct {
	Results []Result `json:"results"`
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

//send image and get prediction from Pytorch API server
func getPrediction(fileURL string, c chan Prediction) {
	var data Prediction
	baseURL := os.Getenv("FLASK_API_BASE_URL")
	targetURL := baseURL + "/predict"

	postBody, _ := json.Marshal(map[string]string{
		"value": fileURL,
	})

	response, err := http.Post(targetURL, "application/json", bytes.NewBuffer(postBody))
	if err != nil {
		panic(err.Error())
	}
	defer response.Body.Close()

	err = json.NewDecoder(response.Body).Decode(&data)

	c <- data
}

// send bird name and get bird details from NatureServe api
func getBirdDetails(name string, c chan NatureServeAPIResponse) {
	var data NatureServeAPIResponse
	targetURL := "https://explorer.natureserve.org/api/data/speciesSearch"

	// textCriteriaQuery := TextCriteria{
	// 	ParamType:    "textSearch",
	// 	SearchToken:  name,
	// 	MatchAgainst: "allNames",
	// 	Operator:     "equals",
	// }

	requestQuery := NatureServeParams{
		CriteriaType: "species",
		TextCriteria: []TextCriteria{{
			ParamType:    "textSearch",
			SearchToken:  name,
			MatchAgainst: "allNames",
			Operator:     "equals",
		}},
	}

	var postBody []byte
	postBody, err := json.Marshal(requestQuery)
	response, err := http.Post(targetURL, "application/json", bytes.NewBuffer(postBody))
	if err != nil {
		panic(err.Error())
	}
	defer response.Body.Close()

	err = json.NewDecoder(response.Body).Decode(&data)
	fmt.Println("data:", data.Results[0].SpeciesGlobal)

	c <- data
}

// SendBird receives url to send to Flask API
func SendBird(c *gin.Context) {
	var bird Bird
	var prediction Prediction
	var natureServeData NatureServeAPIResponse
	c.Bind(&bird)

	predictChan := make(chan Prediction)
	go getPrediction(bird.URL, predictChan)

	prediction = <-predictChan
	// fmt.Println("predictChan:", prediction)

	natureServeChan := make(chan NatureServeAPIResponse)
	go getBirdDetails(prediction.Name, natureServeChan)

	natureServeData = <-natureServeChan

	c.JSON(http.StatusOK, gin.H{
		"id":           prediction.ID,
		"image_url":    bird.URL,
		"name":         prediction.Name,
		"species_info": natureServeData.Results[0].SpeciesGlobal,
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
