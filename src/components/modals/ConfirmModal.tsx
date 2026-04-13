import {
  Button,
  Group,
  Text,
  ThemeIcon,
  Stack,
  Title,
  Modal,
} from "@mantine/core";
import { IconAlertTriangle, type Icon } from "@tabler/icons-react";

export type ConfirmModalProps = {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  isLoading?: boolean;
  icon?: Icon;
};

export function ConfirmModal({
  opened,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Delete",
  isLoading = false,
  icon: Icon = IconAlertTriangle,
}: ConfirmModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      size="sm"
      title={
        <Group gap="sm" align="flex-start">
          <ThemeIcon color="red" variant="light" size="lg" radius="md">
            <Icon size={18} stroke={1.7} />
          </ThemeIcon>
          <Stack gap={1}>
            <Title order={5} lh={1.3}>
              {title}
            </Title>
            <Text size="xs" c="dimmed">
              {description}
            </Text>
          </Stack>
        </Group>
      }
    >
      <Group justify="flex-end" mt="xs">
        <Button variant="default" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button color="red" loading={isLoading} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </Group>
    </Modal>
  );
}
