import {
  Modal,
  Group,
  ThemeIcon,
  Title,
  Text,
  Stack,
  type ModalProps,
  type MantineColor,
} from "@mantine/core";
import type { Icon } from "@tabler/icons-react";

export type BaseModalProps = Omit<ModalProps, "title"> & {
  title: string;
  description?: string;
  icon?: Icon;
  iconColor?: MantineColor;
};

export function BaseModal({
  title,
  description,
  icon: Icon,
  iconColor = "convergeTeal",
  children,
  ...props
}: BaseModalProps) {
  return (
    <Modal
      {...props}
      title={
        <Group gap="sm" align="flex-start">
          {Icon && (
            <ThemeIcon color={iconColor} variant="light" size="lg" radius="md">
              <Icon size={18} stroke={1.7} />
            </ThemeIcon>
          )}
          <Stack gap={1}>
            <Title order={5} lh={1.3}>
              {title}
            </Title>
            {description && (
              <Text size="xs" c="dimmed">
                {description}
              </Text>
            )}
          </Stack>
        </Group>
      }
    >
      {children}
    </Modal>
  );
}
