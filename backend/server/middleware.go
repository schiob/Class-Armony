package server

import "github.com/gofiber/fiber/v2"

type paginateParams struct {
	Limit  int `query:"limit"`
	Offset int `query:"offset"`
}

func paginate(limitDefault, offsetDefault int) fiber.Handler {
	return func(c *fiber.Ctx) error {
		query := &paginateParams{
			Limit:  limitDefault,
			Offset: offsetDefault,
		}

		err := c.QueryParser(query)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"message": err.Error(),
			})
		}

		c.Locals("limit", query.Limit)
		c.Locals("offset", query.Offset)
		return c.Next()
	}
}
