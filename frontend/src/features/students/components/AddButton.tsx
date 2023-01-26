import { Flex, Tooltip, ActionIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons";


interface Props{
    openModal: VoidFunction;
}

export function AddButton( { openModal }: Props){
    return (
        <Flex justify="flex-end" align="flex-start" direction="row" wrap="wrap">
        <Tooltip label="Agregar">
          <ActionIcon
            right={1}
            size={44}
            radius="xl"
            color="blue"
            variant="filled"
            onClick={openModal}
          >
            <IconPlus size={28} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </Flex>
    )
}