import cloudLogo from "../../../assets/cloud.png";
import { Box, Button, Group, Image, Menu, Title } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

export interface GaiaHeaderMenuItem {
  label: string;
  onClick?: () => void;
}

export interface GaiaHeaderMenuGroup {
  label: string;
  items: GaiaHeaderMenuItem[];
}

export interface GaiaHeaderProps {
  /** Path to the logo image. Defaults to "/Cloud.png" */
  logoSrc?: string;
  /** Alt text for the logo */
  logoAlt?: string;
  /** Title displayed in the center of the header */
  title?: string;
  /** Menu groups rendered in the left nav area of the header */
  menuGroups?: GaiaHeaderMenuGroup[];
  /** Slot for extra content on the right side (e.g. user avatar, notifications) */
  rightSection?: React.ReactNode;
  /** Slot to inject a burger button (passed in from ShellLayout) */
  burgerSlot?: React.ReactNode;
}

export function GaiaHeader({
  logoSrc = cloudLogo,
  logoAlt = "Logo",
  title = "GAIA",
  menuGroups = [],
  rightSection,
  burgerSlot,
}: GaiaHeaderProps) {
  return (
    <Box
      h="inherit"
      bg="black"
      px="md"
      c="white"
      style={{ border: "1px solid var(--mantine-color-dark-4)" }}
    >
      <Group h="inherit" align="center" justify="space-between" wrap="nowrap">
        <Group gap="xs">
          {burgerSlot}
          <Image
            src={logoSrc}
            alt={logoAlt}
            mah="100%"
            maw={120}
            fit="contain"
          />

          {menuGroups.map((group) => (
            <Menu
              key={group.label}
              shadow="md"
              width={200}
              position="bottom-start"
            >
              <Menu.Target>
                <Button
                  color="white"
                  variant="transparent"
                  rightSection={<IconChevronDown size={18} stroke={1.5} />}
                >
                  {group.label}
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                {group.items.map((item) => (
                  <Menu.Item key={item.label} onClick={item.onClick}>
                    {item.label}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          ))}
        </Group>

        <Title order={4}>{title}</Title>

        {rightSection && <Box>{rightSection}</Box>}
      </Group>
    </Box>
  );
}
