import { Box, ScrollArea, Title } from "@mantine/core";
import { type Icon } from "@tabler/icons-react";
import { useLocation } from "react-router";
import { NavbarLinksGroup } from "../../links/NavbarLinksGroup";
import { type GaiaRemoteConfigs } from "@/context/GaiaShellContext";

export interface GaiaNavbarLink {
  icon: Icon;
  label: string;
  link?: string;
  permissions?: string[];
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

export interface GaiaNavbarSection {
  system: keyof GaiaRemoteConfigs;
  title: string;
  links: GaiaNavbarLink[];
}

export interface GaiaNavbarProps {
  /** All nav sections — the correct one is resolved from the current pathname */
  sections: GaiaNavbarSection[];
  /**
   * Given the current pathname, return the title of the section to display.
   *
   * @example
   * resolveSection={(pathname) => {
   *   if (pathname.includes("/infrastructure")) return "Infrastructure";
   *   return "Dashboard";
   * }}
   */
  resolveSection: (pathname: string) => string;
}

export function GaiaNavbar({ sections, resolveSection }: GaiaNavbarProps) {
  const { pathname } = useLocation();
  const section = sections.find((s) => s.title === resolveSection(pathname));

  if (!section) return null;

  return (
    <Box
      bg="black"
      c="white"
      h="100%"
      display="flex"
      style={{ flexDirection: "column" }}
    >
      <Box
        p="sm"
        style={{ borderBottom: "1px solid var(--mantine-color-dark-4)" }}
      >
        <Title order={4}>{section.title}</Title>
      </Box>

      <ScrollArea flex={1}>
        <Box>
          {section.links.map((link) => (
            <NavbarLinksGroup
              key={link.label}
              {...link}
              currentPath={pathname}
            />
          ))}
        </Box>
      </ScrollArea>
    </Box>
  );
}
