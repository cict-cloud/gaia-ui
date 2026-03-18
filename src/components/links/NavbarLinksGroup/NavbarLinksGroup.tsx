import { useState } from "react";
import { Box, Collapse, Group, Text, UnstyledButton } from "@mantine/core";
import { Link } from "react-router";
import { IconChevronRight, type Icon } from "@tabler/icons-react";

import classes from "./NavbarLinksGroup.module.css";

export interface NavbarLinksGroupItem {
  label: string;
  link: string;
}

export interface NavbarLinksGroupProps {
  icon: Icon;
  label: string;
  link?: string;
  initiallyOpened?: boolean;
  links?: NavbarLinksGroupItem[];
  currentPath: string;
}

export function NavbarLinksGroup({
  icon: Icon,
  label,
  link,
  initiallyOpened,
  links,
  currentPath,
}: NavbarLinksGroupProps) {
  const hasLinks = Array.isArray(links) && links.length > 0;
  const [opened, setOpened] = useState(initiallyOpened ?? false);

  if (!hasLinks && link) {
    return (
      <Text
        component={Link}
        to={link}
        className={classes["simple-link"]}
        data-active={link === currentPath || undefined}
      >
        <Group gap="md">
          <Group w={30} h={30} align="center" justify="center">
            <Icon size={18} />
          </Group>
          <Box>{label}</Box>
        </Group>
      </Text>
    );
  }

  const items = links!.map((item) => (
    <Text
      component={Link}
      to={item.link}
      key={item.label}
      className={classes["collapsible-link"]}
      data-active={item.link === currentPath || undefined}
    >
      {item.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
      >
        <Group justify="space-between" gap={0}>
          <Group align="center" gap="md">
            <Group w={30} h={30} align="center" justify="center">
              <Icon size={18} />
            </Group>
            <Box>{label}</Box>
          </Group>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              size={16}
              style={{ transform: opened ? "rotate(-90deg)" : "none" }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks && <Collapse in={opened}>{items}</Collapse>}
    </>
  );
}
