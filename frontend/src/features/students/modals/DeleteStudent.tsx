import { Modal, Text, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";

interface Props{
    isOpened: boolean;
    closeModal: VoidFunction;
    studentID: string;
    deleteStudent: (studentId: string) => void;
}

export function DeleteStudent( { closeModal, isOpened, studentID, deleteStudent }: Props){
  const form = useForm();  
  const submitForm = async () => {
        await deleteStudent(studentID);
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