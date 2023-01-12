import { Header, Title, Avatar, Center, Space } from "@mantine/core";

export function CustomHeader() {
  return (
    <Header height={60} p="xs">
      {
        <Center inline>
          <Avatar color="blue" radius="sm">
            X
          </Avatar>
          <Space w="md" />
          <Title>Armony</Title>
        </Center>
      }
    </Header>
  );
}
