package controller

//Bird request from form data
type Bird struct {
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

// SpeciesGlobal contains info relating to bird result
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

// Result from each entry in API response
type Result struct {
	SpeciesGlobal SpeciesGlobal `json:"speciesGlobal"`
}

// NatureServeAPIResponse response from NatureServe API
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
