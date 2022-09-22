package server

import (
	"armony"
	"log"

	"github.com/gofiber/fiber/v2"
)

type studentsStorage interface {
	List() ([]armony.Student, error)
	GetByID(id string) (*armony.Student, error)
	Create(student armony.Student, tutorID *string) (*armony.Student, error)
	DeleteByID(id string) error
}

type studentsService struct {
	path    string
	storage studentsStorage
}

type studentPayload struct {
	Name     string  `json:"name"`
	HasTutor bool    `json:"hasTutor"`
	Phone    string  `json:"phone,omitempty"`
	TutorID  *string `json:"tutorId,omitempty"`
}

type links struct {
	First string `json:"first"`
	Last  string `json:"last"`
	Prev  string `json:"prev"`
	Next  string `json:"next"`
}
type studentsList struct {
	Links    links            `json:"_links"`
	Students []armony.Student `json:"students"`
}

func newStudentsService(path string, ss studentsStorage) studentsService {
	return studentsService{
		path:    path,
		storage: ss,
	}
}

func (s studentsService) SetRoutes(app *fiber.App) error {
	studentsGroup := app.Group(s.path)

	studentsGroup.Get("/", paginate(50, 0), s.list)
	studentsGroup.Post("/", s.create)
	studentsGroup.Get("/:id", s.getByID)
	studentsGroup.Patch("/:id", todo)
	studentsGroup.Delete("/:id", s.deteleByID)

	return nil
}

func (s studentsService) list(c *fiber.Ctx) error {
	// TODO: this
	log.Println(c.Locals("limit"))
	// limit := c.Locals("limit")
	// offset := c.Locals("offset")
	// DB query
	students, err := s.storage.List()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	res := studentsList{
		Students: students,
	}
	return c.JSON(res)
}

func (s studentsService) create(c *fiber.Ctx) error {
	// Unmarshal
	studentP := new(studentPayload)

	if err := c.BodyParser(studentP); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	// Store in DB
	dbStudent, err := s.storage.Create(armony.Student{
		Name:     studentP.Name,
		HasTutor: studentP.HasTutor,
		Phone:    studentP.Phone,
	}, studentP.TutorID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	// Return Student Object
	return c.JSON(dbStudent)
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

func (s studentsService) deteleByID(c *fiber.Ctx) error {
	studentID := c.Params("id")

	// Extract Student from Database
	err := s.storage.DeleteByID(studentID)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}
	//Return user
	return c.SendStatus(202)
}

func todo(c *fiber.Ctx) error {
	return c.SendString("Hello, World!")
}
