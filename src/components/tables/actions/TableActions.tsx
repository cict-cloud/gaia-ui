import { ActionIcon, Group, type GroupProps } from "@mantine/core";
import {
  IconEye,
  IconEditFilled,
  IconTrash,
  type Icon,
} from "@tabler/icons-react";

export type TableAction = "view" | "update" | "delete";

export type TableActionsProps = {
  include?: TableAction[];
  justify?: GroupProps["justify"];
  onClick: (action: TableAction) => void;
};

export function TableActions({
  include = ["view", "update", "delete"],
  justify = "flex-start",
  onClick,
}: TableActionsProps) {
  const actions: { type: TableAction; icon: Icon; color?: string }[] = [
    { type: "view", icon: IconEye },
    { type: "update", icon: IconEditFilled, color: "var(--gaia-action-edit, var(--mantine-color-yellow-6))" },
    { type: "delete", icon: IconTrash, color: "var(--gaia-action-delete, var(--mantine-color-red-6))" },
  ];

  return (
    <Group justify={justify} gap={4}>
      {actions
        .filter((action) => include.includes(action.type))
        .map((action) => {
          const TablerIcon = action.icon;
          return (
            <ActionIcon
              key={action.type}
              color={action.color}
              variant="subtle"
              size="sm"
              onClick={() => onClick(action.type)}
            >
              <TablerIcon size={18} stroke={1.7} />
            </ActionIcon>
          );
        })}
    </Group>
  );
}
