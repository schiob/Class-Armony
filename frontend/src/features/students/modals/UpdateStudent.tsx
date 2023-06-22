import { Modal, TextInput, Checkbox, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { Student, StudentPayload } from "../types";

interface Props {
  isOpened: boolean;
  closeModal: VoidFunction;
  updateStudent: (oldStudent: Student, newStudent: StudentPayload) => void;
  student: Student;
}

export function UpdateStudent({
  closeModal,
  isOpened,
  updateStudent,
  student,
}: Props) {
  const form = useForm<StudentPayload>({
    initialValues: {
      name: student.name,
      phone: student.phone,
      hasTutor: student.hasTutor,
    },
  });


  console.log(student);
  // useEffect(() => {
  //   form.setValues({
  //     name: student.name,
  //     phone: student.phone,
  //     hasTutor: student.hasTutor,
  //   });
  // }, [form, student]);

  const submitForm = async (value: StudentPayload) => {
    await updateStudent(student, value);
    closeModal();
  };

  return (
    <Modal
      centered
      opened={isOpened}
      onClose={closeModal}
      title="Modificar estudiante"
    >
      <form onSubmit={form.onSubmit(submitForm)}>
        <TextInput
          withAsterisk
          label="Nombre"
          // placeholder={student.name}
          // value={student.name}
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
    </Modal>
  );
}
