package armony

import (
	"time"
)

type Student struct {
	ID       string
	Name     string
	HasTutor bool
	Phone    string
}

type Tutor struct {
	ID          string
	StudentsIDs []string
	Name        string
	Phone       string
}

type Subject struct {
	ID   string
	Name string
}

type Schedule struct {
	WeekDay       time.Weekday
	StartHourTime int
	StartMinTime  int
	EndHourTime   int
	EndMinTime    int
}

type Teacher struct {
	ID           string
	Subjects     []Subject
	Availability []Schedule
	Name         string
	Phone        string
	Provisional  bool
}

type Class struct {
	ID                string
	DefinitiveTeacher Teacher
	Students          []Student
	Schedule          []Schedule
}

func (c Class) WeekHours() float64 {
	total := 0.0

	for _, schedual := range c.Schedule {
		endTime := float64(schedual.EndHourTime) + (float64(schedual.EndMinTime) / 60)
		initialTime := float64(schedual.StartHourTime) + (float64(schedual.StartMinTime) / 60)
		total += (endTime - initialTime)
	}
	return total
}
