import { useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  ActionIcon,
  Group,
} from "@mantine/core";
import { Student } from "../types";
import { IconPencil, IconTrash } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

interface TableScrollAreaProps {
  data: Student[];
  openDeleteModal: VoidFunction;
  openUpdateModal: VoidFunction;
  setStudent: (student: Student) => void;
}

export function TableScrollArea({
  data,
  openDeleteModal,
  openUpdateModal,
  setStudent,
}: TableScrollAreaProps) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row) => (
    <tr key={row.name}>
      <td>{row.name}</td>
      <td>{row.hasTutor ? "Tiene tutor" : "no tiene tutor"}</td>
      <td>{row.phone}</td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon
          onClick={() => {
            setStudent(row);
            openUpdateModal();
          }}
          >
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            onClick={() => {
              setStudent(row);
              openDeleteModal();
            }}
          >
            <IconTrash size={16} stroke={1.5} color="red" />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea
      sx={{ height: 300 }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table sx={{ minWidth: 700 }}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Nombre</th>
            <th>Tutor</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
