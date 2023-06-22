import { useState } from "react";
import { Title, Loader } from "@mantine/core";
import { TableScrollArea } from "../features/students/components/Table";
import { AddButton } from "../features/students/components/AddButton";
import { CreateStudent as CreateStudentModal } from "../features/students/modals/CreateStudent";
import { UpdateStudent as UpdateStudentModal } from "../features/students/modals/UpdateStudent";
import { DeleteStudent as DeleteStudentModal } from "../features/students/modals/DeleteStudent";
import useStudents from "../features/students/hooks/useStudents";
import { Student } from "../features/students/types";

export function StudentsPage() {
  const [createModalOpened, setCreateModalOpened] = useState(false);
  const [updateModalOpened, setUpdateModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student>({} as Student);
  const { isLoading, students, addStudent, updateStudent, deleteStudent } = useStudents();

  return (
    <div>
      <Title>Alumnos</Title>
      {isLoading ? (
        <Loader />
      ) : (
        <TableScrollArea
          data={students}
          openDeleteModal={() => setDeleteModalOpened(true)}
          openUpdateModal={() => setUpdateModalOpened(true)}
          setStudent={setCurrentStudent}
        />
      )}

      <CreateStudentModal
        isOpened={createModalOpened}
        closeModal={() => setCreateModalOpened(false)}
        addStudent={addStudent}
      />
      <UpdateStudentModal
        isOpened={updateModalOpened}
        closeModal={() => setUpdateModalOpened(false)}
        student={currentStudent}
        updateStudent={updateStudent}
      />
      <DeleteStudentModal
        isOpened={deleteModalOpened}
        closeModal={() => setDeleteModalOpened(false)}
        student={currentStudent}
        deleteStudent={deleteStudent}
      />
      <AddButton openModal={() => setCreateModalOpened(true)} />
    </div>
  );
}
