package controller

import (
	"bytes"
	"encoding/json"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

// ValidationErrors Users input validation errros
var ValidationErrors = []string{}

//HandleErr //generic error handler, logs error and Os.Exit(1)
func HandleErr(c *gin.Context, err error) error {
	if err != nil {
		c.Error(err)
	}
	return err
}

//send image and get prediction from Pytorch API server
func getPrediction(fileURL string, c chan Prediction) error {
	var data Prediction
	baseURL := os.Getenv("FLASK_API_BASE_URL")
	targetURL := baseURL + "/predict"

	postBody, _ := json.Marshal(map[string]string{
		"value": fileURL,
	})

	response, err := http.Post(targetURL, "application/json", bytes.NewBuffer(postBody))
	if err != nil {
		return err
	}
	defer response.Body.Close()

	err = json.NewDecoder(response.Body).Decode(&data)

	c <- data
	return err
}

func getQuery(name string) NatureServeParams {
	return NatureServeParams{
		CriteriaType: "species",
		TextCriteria: []TextCriteria{{
			ParamType:    "textSearch",
			SearchToken:  name,
			MatchAgainst: "allNames",
			Operator:     "equals",
		}},
	}
}

// send bird name and get bird details from NatureServe api
func getBirdDetails(name string, c chan NatureServeAPIResponse) error {
	var data NatureServeAPIResponse
	targetURL := "https://explorer.natureserve.org/api/data/speciesSearch"

	requestQuery := getQuery(name)

	var postBody []byte
	postBody, err := json.Marshal(requestQuery)
	response, err := http.Post(targetURL, "application/json", bytes.NewBuffer(postBody))
	if err != nil {
		return err
	} else if response.StatusCode == 404 {
		// err := errors.New("Data not found")
		// return err
	}
	defer response.Body.Close()

	err = json.NewDecoder(response.Body).Decode(&data)

	c <- data
	return err
}
