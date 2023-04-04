import { useEffect, useState } from "react";
import { Student, StudentPayload } from "../../types";

const STUDENTS_ENDPOINT = "http://localhost:8080/students/";

export function useStudents() {
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);

  // TODO: Cambiar esto a usar useCallback
  const getStudents = async () => {
    const response = await fetch(STUDENTS_ENDPOINT);
    const list = await response.json();
    const students = list.students ?? []
    
    setStudents(students);
    setIsLoading(false);
  };

  useEffect(() => {getStudents()}, []);

  // TODO: esto también
  const addStudent = async (studentP: StudentPayload) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentP),
    };

    const response = await fetch(
      STUDENTS_ENDPOINT,
      requestOptions
    );
    const data = await response.json();

    setStudents((prev) => [...prev, data]);
  };

  const deleteStudent = async (studentID: string) => {
    const requestOptions = {
      method: "DELETE",
    };

    const response = await fetch(
      STUDENTS_ENDPOINT.concat(studentID),
      requestOptions
    );
    
    const responseStatus = await response.status;
    console.log(responseStatus);

    setStudents((prev) => {
      var newArr: Array<Student> = [];

      prev.forEach(element => {
        if(element.id !== studentID){
          newArr.push(element);
        }
      });

      return newArr;
    });
  };

  return { isLoading, students, addStudent, deleteStudent };
}
