package server

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func Start(port string, ss studentsStorage) error {
	app := fiber.New()

	app.Use(logger.New())
	studentsController := newStudentsService("/students", ss)
	studentsController.SetRoutes(app)

	return app.Listen(port)
}
