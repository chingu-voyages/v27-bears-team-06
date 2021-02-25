package router

import (
	"github.com/v27-bears-team-06/server/controller"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

// SetupRouter setup routing here
func SetupRouter() *gin.Engine {
	router := gin.Default()

	// Set a lower memory limit for multipart forms (default is 32 MiB)
	router.MaxMultipartMemory = 8 << 20 // 8 MiB

	// Serve frontend static files
	router.Use(static.Serve("/", static.LocalFile("./web", true)))
	api := router.Group("/api")
	// Middlewares
	// router.Use(middlewares.ErrorHandler)
	// router.Use(middlewares.CORSMiddleware())

	// routes
	api.GET("/ping", controller.Pong)
	api.POST("/bird", controller.SendBird)
	api.POST("/bird-image", controller.SendBirdImage)

	return router
}
