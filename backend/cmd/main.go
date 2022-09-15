package main

import (
	"armony"
	"armony/server"
	"log"
	"math/rand"
)

func main() {
	port := ":8080"
	log.Fatal(server.Start(port, storageMock{}))
}

type storageMock struct{}

func (s storageMock) GetByID(id string) (armony.Student, error) {
	switch option := rand.Intn(2); option {
	case 0:
		return armony.Student{
			ID:       id,
			Name:     "Cesar pero del Storage",
			HasTutor: false,
			Phone:    "111000111",
		}, nil
	case 1:
		return armony.Student{
			ID:       id,
			Name:     "Chio",
			HasTutor: false,
			Phone:    "111000111",
		}, nil

	}
	student := armony.Student{
		ID:       id,
		Name:     "Cesar pero fuera del switch",
		HasTutor: false,
		Phone:    "111000111",
	}
	return student, nil
}
