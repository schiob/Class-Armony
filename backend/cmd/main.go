package main

import (
	"armony"
	"armony/postgres"
	"armony/server"
	"errors"
	"log"

	"github.com/google/uuid"
)

func main() {
	port := ":8080"

	// storage := &storageMock{
	// 	students: make(map[string]armony.Student),
	// }

	uri := "postgres://chio:password@127.0.0.1:5432/armony?sslmode=disable"
	postresStorage, err := postgres.NewStorage(uri)
	if err != nil {
		panic(err)
	}
	log.Fatal(server.Start(port, postresStorage))
}

type storageMock struct {
	students map[string]armony.Student
}

func (s *storageMock) List(limit, offset int) ([]armony.Student, int, error) {
	res := make([]armony.Student, 0)
	for _, student := range s.students {
		if len(res) == limit {
			return res, len(s.students), nil
		}
		res = append(res, student)
	}
	return res, len(s.students), nil
}

func (s *storageMock) Create(student armony.Student, tutorID *string) (*armony.Student, error) {
	student.ID = uuid.New().String()
	s.students[student.ID] = student

	return &student, nil
}

func (s storageMock) GetByID(id string) (*armony.Student, error) {
	if student, ok := s.students[id]; ok {
		return &student, nil
	}
	return nil, errors.New("Not Found")
}

func (s *storageMock) DeleteByID(id string) error {
	if _, ok := s.students[id]; ok {
		delete(s.students, id)
		return nil
	}
	return errors.New("Not Found")
}

func (s *storageMock) Replace(id string, student armony.Student) error {
	s.students[id] = student
	return nil
}
