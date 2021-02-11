package main

import (
	"log"
	"os"

	"github.com/v27-bears-team-06/server/router"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	port := os.Getenv("PORT")

	r := router.SetupRouter()
	r.Run(port)
}
