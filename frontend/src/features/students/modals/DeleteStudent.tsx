import { Modal, Text, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Student } from "../types";

interface Props{
    isOpened: boolean;
    closeModal: VoidFunction;
    student: Student;
    deleteStudent: (studentId: string) => void;
}

export function DeleteStudent( { closeModal, isOpened, student, deleteStudent }: Props){
  const form = useForm();  
  const submitForm = async () => {
        await deleteStudent(student.id);
        closeModal();
    }

    return (
    <Modal
        centered
        opened={isOpened}
        onClose={closeModal}
        title="Eliminar estudiante"
      >
        <form
          onSubmit={ form.onSubmit(submitForm)}
        >
          <Text>Seguro que lo quieres borrar?</Text>

          <Group position="right" mt="md">
            <Button type="submit">Si, eliminar</Button>
          </Group>
        </form>
      </Modal>)
}