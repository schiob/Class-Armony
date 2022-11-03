package postgres

import (
	"database/sql"
	"fmt"

	// registering database driver
	_ "github.com/lib/pq"
)

type Controller struct {
	DB *sql.DB
}

func NewStorage(uri string) (*Controller, error) {
	// uri := "postgres://gopher:gopher@127.0.0.1:5432/microblog?sslmode=disable"
	db, err := sql.Open("postgres", uri)
	if err != nil {
		return nil, fmt.Errorf("error opening db connection: %w", err)
	}
	return &Controller{db}, nil
}
