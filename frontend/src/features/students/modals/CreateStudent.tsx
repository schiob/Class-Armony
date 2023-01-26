import { Modal, TextInput, Checkbox, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { StudentPayload } from "../types";

interface Props{
    isOpened: boolean;
    closeModal: VoidFunction;
    addStudent: (data: StudentPayload) => void;
}

export function CreateStudent( { closeModal, isOpened, addStudent }: Props){
    const form = useForm<StudentPayload>({
        initialValues: {
          name: "",
          phone: "",
          hasTutor: false,
        },
      });

    const submitForm = async (value: StudentPayload) => {
        await addStudent(value);
        closeModal();
    }

    return (
    <Modal
        centered
        opened={isOpened}
        onClose={closeModal}
        title="Crear nuevo estudiante"
      >
        <form
          onSubmit={form.onSubmit(submitForm)}
        >
          <TextInput
            withAsterisk
            label="Nombre"
            placeholder="Santiago Chio"
            {...form.getInputProps("name")}
          />
          <TextInput
            withAsterisk
            label="Teléfono"
            placeholder="10001101"
            {...form.getInputProps("phone")}
          />

          <Checkbox
            mt="md"
            label="Tiene tutor?"
            {...form.getInputProps("hasTutor", { type: "checkbox" })}
          />

          <Group position="right" mt="md">
            <Button type="submit">Crear</Button>
          </Group>
        </form>
      </Modal>)
}