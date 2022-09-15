package server

import (
	"armony"

	"github.com/gofiber/fiber/v2"
)

type studentsStorage interface {
	GetByID(id string) (armony.Student, error)
}

type studentsService struct {
	path    string
	storage studentsStorage
}

func newStudentsService(path string, ss studentsStorage) studentsService {
	return studentsService{
		path:    path,
		storage: ss,
	}
}

func (s studentsService) SetRoutes(app *fiber.App) error {
	studentsGroup := app.Group(s.path)

	studentsGroup.Get("/", todo)
	studentsGroup.Post("/", todo)
	studentsGroup.Get("/:id", s.getByID)
	studentsGroup.Patch("/:id", todo)
	studentsGroup.Delete("/:id", todo)

	return nil
}

func (s studentsService) getByID(c *fiber.Ctx) error {
	studentID := c.Params("id")

	// Extract Student from Database
	student, err := s.storage.GetByID(studentID)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}
	//Return user
	return c.JSON(student)
}

func todo(c *fiber.Ctx) error {
	return c.SendString("Hello, World!")
}
