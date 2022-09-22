package main

import (
	"armony"
	"armony/server"
	"errors"
	"log"

	"github.com/google/uuid"
)

func main() {
	port := ":8080"
	storage := &storageMock{
		students: make(map[string]armony.Student),
	}
	log.Fatal(server.Start(port, storage))
}

type storageMock struct {
	students map[string]armony.Student
}

func (s *storageMock) List() ([]armony.Student, error) {
	res := make([]armony.Student, 0)
	for _, s := range s.students {
		res = append(res, s)
	}
	return res, nil
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
