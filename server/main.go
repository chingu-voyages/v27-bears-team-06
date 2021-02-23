package main

import (
	"github.com/v27-bears-team-06/server/router"
)

func main() {
	// err := godotenv.Load()
	// if err != nil {
	// 	log.Fatal("Error loading .env file")
	// }
	// port := os.Getenv("PORT")
	// port := "8080"

	r := router.SetupRouter()
	r.Run()
}
