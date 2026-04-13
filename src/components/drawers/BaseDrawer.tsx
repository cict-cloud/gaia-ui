import {
  Drawer,
  Group,
  ThemeIcon,
  Title,
  Text,
  Stack,
  type DrawerProps,
  type MantineColor,
} from "@mantine/core";
import type { Icon } from "@tabler/icons-react";

export type BaseDrawerProps = Omit<DrawerProps, "title"> & {
  title: string;
  description?: string;
  icon?: Icon;
  iconColor?: MantineColor;
};

export function BaseDrawer({
  title,
  description,
  icon: Icon,
  iconColor = "convergeTeal",
  size = "lg",
  children,
  ...props
}: BaseDrawerProps) {
  return (
    <Drawer
      position="right"
      size={size}
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
    </Drawer>
  );
}
