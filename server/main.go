package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/v27-bears-team-06/server/router"
)

func main() {
	isLocal := os.Getenv("GO_ENV") == ""

	if isLocal == true {
		err := godotenv.Load()
		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}

	port := os.Getenv("PORT")

	r := router.SetupRouter()
	r.Run(port)
}
