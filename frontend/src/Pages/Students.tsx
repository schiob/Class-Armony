import { useState } from "react";
import {
  Title,
  Loader,
} from "@mantine/core";
import { TableScrollArea } from "../features/students/components/Table";
import { AddButton } from "../features/students/components/AddButton";
import { CreateStudent as CreateStudentModal } from "../features/students/modals/CreateStudent";
import { DeleteStudent as DeleteStudentModal } from "../features/students/modals/DeleteStudent";
import {useStudents} from "../features/students/hooks/students";


export function StudentsPage() {
  const [createModalOpened, setCreateModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState<string>("");
  const { isLoading, students, addStudent, deleteStudent } = useStudents()

  return (
    <div>
      <Title>Alumnos</Title>
      {isLoading ? <Loader /> : <TableScrollArea data={students} openModal={() => setDeleteModalOpened(true)} setStudentID={setCurrentStudentId} />}

      <CreateStudentModal isOpened={createModalOpened} closeModal={() => setCreateModalOpened(false)} addStudent={addStudent} />
      <DeleteStudentModal isOpened={deleteModalOpened} closeModal={() => setDeleteModalOpened(false)} studentID={currentStudentId} deleteStudent={deleteStudent} />
      <AddButton openModal={() => setCreateModalOpened(true)} />
    </div>
  );
}
