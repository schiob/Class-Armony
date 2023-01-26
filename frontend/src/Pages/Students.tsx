import { useState } from "react";
import {
  Title,
  Loader,
} from "@mantine/core";
import { TableScrollArea } from "../features/students/components/Table";
import { AddButton } from "../features/students/components/AddButton";
import { CreateStudent as CreateStudentModal } from "../features/students/modals/CreateStudent";
import useStudents from "../features/students/hooks/useStudents";


export function StudentsPage() {
  const [modalOpened, setModalOpened] = useState(false);
  const { isLoading, students, addStudent } = useStudents()

  return (
    <div>
      <Title>Alumnos</Title>
      {isLoading ? <Loader /> : <TableScrollArea data={students} />}

      <CreateStudentModal isOpened={modalOpened} closeModal={() => setModalOpened(false)} addStudent={addStudent} />
      <AddButton openModal={() => setModalOpened(true)} />
    </div>
  );
}
