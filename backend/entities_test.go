package armony

import (
	"testing"
)

func TestClass_WeekHours(t *testing.T) {
	type fields struct {
		ID                string
		DefinitiveTeacher Teacher
		Students          []Student
		Schedule          []Schedule
	}
	tests := []struct {
		name   string
		fields fields
		want   float64
	}{
		{
			name: "One simple Schedule",
			fields: fields{
				Schedule: []Schedule{
					{
						WeekDay:       2,
						StartHourTime: 10,
						StartMinTime:  30,
						EndHourTime:   11,
						EndMinTime:    30,
					},
				},
			},
			want: 1.0,
		},
		{
			name: "two simple Schedule",
			fields: fields{
				Schedule: []Schedule{
					{
						WeekDay:       2,
						StartHourTime: 10,
						StartMinTime:  30,
						EndHourTime:   11,
						EndMinTime:    30,
					},
					{
						WeekDay:       4,
						StartHourTime: 14,
						StartMinTime:  00,
						EndHourTime:   16,
						EndMinTime:    30,
					},
				},
			},
			want: 3.5,
		},
		{
			name: "not valid Schedule",
			fields: fields{
				Schedule: []Schedule{
					{
						WeekDay:       2,
						StartHourTime: 10,
						StartMinTime:  30,
						EndHourTime:   9,
						EndMinTime:    30,
					},
				},
			},
			want: 0.0,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			c := Class{
				ID:                tt.fields.ID,
				DefinitiveTeacher: tt.fields.DefinitiveTeacher,
				Students:          tt.fields.Students,
				Schedule:          tt.fields.Schedule,
			}
			if got := c.WeekHours(); got != tt.want {
				t.Errorf("Class.WeekHours() = %v, want %v", got, tt.want)
			}
		})
	}
}
