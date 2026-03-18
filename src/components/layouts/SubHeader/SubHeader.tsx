import { Group, Title } from "@mantine/core";

export interface SubHeaderProps {
  title: string;
  content?: React.ReactNode;
}

export function SubHeader({ title, content }: SubHeaderProps) {
  return (
    <Group bg="white" px="md" justify="space-between" align="center" h={50}>
      <Title order={5}>{title}</Title>
      <Group>{content}</Group>
    </Group>
  );
}
