package postgres

import (
	"armony"
	"database/sql"
	"fmt"
	"strconv"
)

func (s *Controller) List(limit, offset int) ([]armony.Student, int, error) {
	sqlStatement := `SELECT id, name, has_tutor, phone FROM students LIMIT $1 OFFSET $2;`

	students := make([]armony.Student, 0)

	rows, err := s.DB.Query(sqlStatement, limit, offset)
	if err != nil {
		return nil, 0, fmt.Errorf("error quering database: %w", err)
	}
	defer rows.Close()
	for rows.Next() {
		student := armony.Student{}
		err = rows.Scan(&student.ID, &student.Name, &student.HasTutor, &student.Phone)
		if err != nil {
			return nil, 0, fmt.Errorf("error in row scan: %w", err)
		}
		students = append(students, student)
	}

	var studentsCount int

	sqlStatement = `SELECT count(*) FROM students;`
	row := s.DB.QueryRow(sqlStatement)
	err = row.Scan(&studentsCount)
	if err != nil {
		return nil, 0, fmt.Errorf("error counting students: %w", err)
	}

	return students, studentsCount, nil
}

func (s *Controller) Create(student armony.Student, tutorID *string) (*armony.Student, error) {
	lastInsertId := 0
	err := s.DB.QueryRow("INSERT INTO students (name, has_tutor, phone, tutor_id) VALUES($1, $2, $3, $4) RETURNING id", student.Name, student.HasTutor, student.Phone, tutorID).Scan(&lastInsertId)
	if err != nil {
		return nil, fmt.Errorf("error running sql query: %w", err)
	}

	student.ID = strconv.Itoa(lastInsertId)
	return &student, nil
}

func (s Controller) GetByID(id string) (*armony.Student, error) {
	sqlStatement := `SELECT id, name, has_tutor, phone FROM students WHERE id=$1;`

	student := &armony.Student{}

	row := s.DB.QueryRow(sqlStatement, id)
	switch err := row.Scan(&student.ID, &student.Name, &student.HasTutor, &student.Phone); err {
	case sql.ErrNoRows:
		return nil, fmt.Errorf("no rows returned")
	case nil:
		return student, nil
	default:
		return nil, fmt.Errorf("error in query: %w", err)
	}
}

func (s *Controller) DeleteByID(id string) error {
	stmt := "DELETE FROM students WHERE id = $1"
	_, err := s.DB.Exec(stmt, id)
	if err != nil {
		return fmt.Errorf("error running sql query: %w", err)
	}
	return nil
}

func (s *Controller) Replace(id string, student armony.Student) error {
	// TODO: agregar el id del tutor
	stmt := `
	UPDATE students
	SET name = $2,
		has_tutor = $3,
		phone = $4,
		tutor_id = $5
	WHERE id = $1;`
	_, err := s.DB.Exec(stmt, id, student.Name, student.HasTutor, student.Phone, nil)
	if err != nil {
		return fmt.Errorf("error running sql query: %w", err)
	}

	return nil
}
