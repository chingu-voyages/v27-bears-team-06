package controller

import "github.com/gin-gonic/gin"

// GetBirdResponse is return for GetBird
type GetBirdResponse struct {
	status int
	data   gin.H
}

//SendBirdPayload response to send client
type SendBirdPayload struct {
	ID          int           `json:"id"`
	Name        string        `json:"name"`
	SpeciesInfo SpeciesGlobal `json:"species_info,omitempty"`
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

// SpeciesGlobal contains info relating to bird result
type SpeciesGlobal struct {
	Synonyms          []string `json:"synonyms,omitempty"`
	OtherCommonNames  []string `json:"otherCommonNames,omitempty"`
	Kingdom           string   `json:"kingdom,omitempty"`
	Phylum            string   `json:"phylum,omitempty"`
	TaxClass          string   `json:"taxclass,omitempty"`
	TaxOrder          string   `json:"taxorder,omitempty"`
	Family            string   `json:"family,omitempty"`
	Genus             string   `json:"genus,omitempty"`
	TaxonomicComments string   `json:"taxonomicComments,omitempty"`
	InformalTaxonomy  string   `json:"informalTaxonomy,omitempty"`
}

// Result from each entry in API response
type Result struct {
	SpeciesGlobal SpeciesGlobal `json:"speciesGlobal"`
}

// NatureServeAPIResponse response from NatureServe API
type NatureServeAPIResponse struct {
	Results []Result `json:"results"`
}

// Location contains info relating to nearby bird observations
type Location struct {
	SpeciesCode     string  `json:"speciesCode"`
	ComName         string  `json:"comName"`
	SciName         string  `json:"sciName"`
	LocName         string  `json:"locName"`
	HowMany         int     `json:"howMany"`
	Lat             float32 `json:"lat"`
	Lng             float32 `json:"lng"`
	LocationPrivate bool    `json:"locationPrivate"`
}

// TextCriteria params for API POST request
type TextCriteria struct {
	ParamType    string `json:"paramType"`
	SearchToken  string `json:"searchToken"`
	MatchAgainst string `json:"matchAgainst"`
	Operator     string `json:"operator"`
}
