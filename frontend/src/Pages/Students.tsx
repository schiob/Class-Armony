import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import {
  Title,
  Loader,
  ActionIcon,
  Flex,
  Tooltip,
  Modal,
  TextInput,
  Checkbox,
  Button,
  Group,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { TableScrollArea } from "./../components/Table";

interface StudentPayload {
  hasTutor: boolean;
  name: string;
  phone: string;
}

function handleCreateStudent(
  value: StudentPayload,
  setModalOpened: React.Dispatch<React.SetStateAction<boolean>>,
  setStudents: React.Dispatch<React.SetStateAction<never[]>>
) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(value),
  };

  fetch("http://localhost:8080/students", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setModalOpened(false);
      setStudents(data);
    });
}

export function StudentsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/students")
      .then((response) => response.json())
      .then((list) => {
        setStudents(list.students);
        setIsLoading(false);
      });
  }, []);

  const form = useForm({
    initialValues: {
      name: "",
      phone: "",
      hasTutor: false,
    },
  });

  return (
    <div>
      <Title>Alumnos</Title>
      {isLoading ? <Loader /> : <TableScrollArea data={students} />}

      <Modal
        centered
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Crear nuevo estudiante"
      >
        <form
          onSubmit={form.onSubmit((value) =>
            handleCreateStudent(value, setModalOpened, 
              (x) => {
              const newStudents: never[] = [...students, x];
              setStudents(newStudents);
            })
          )}
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
      </Modal>
      <Flex justify="flex-end" align="flex-start" direction="row" wrap="wrap">
        <Tooltip label="Agregar">
          <ActionIcon
            right={1}
            size={44}
            radius="xl"
            color="blue"
            variant="filled"
            onClick={() => setModalOpened(true)}
          >
            <IconPlus size={28} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </Flex>
    </div>
  );
}
