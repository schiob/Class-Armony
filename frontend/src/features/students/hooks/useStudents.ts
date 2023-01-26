import { useEffect, useState } from "react";
import { Student, StudentPayload } from "../types";

export default function useStudents() {
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);

  // TODO: Cambiar esto a usar useCallback
  const getStudents = async () => {
    const response = await fetch("http://localhost:8080/students");
    const list = await response.json();

    setStudents(list.students);
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
      "http://localhost:8080/students",
      requestOptions
    );
    const data = await response.json();
    console.log(data);

    setStudents((prev) => [...prev, data]);
  };

  return { isLoading, students, addStudent };
}
