import { Box, ScrollArea, Title } from "@mantine/core";

export interface GaiaNavbarLink {
  label: string;
  path: string;
  icon?: React.ReactNode;
  links?: GaiaNavbarLink[];
}

export interface GaiaNavbarSection {
  title: string;
  links: GaiaNavbarLink[];
}

export interface GaiaNavbarProps {
  /** The section to display based on current route context */
  section: GaiaNavbarSection | undefined;
  /** Current pathname used to highlight active links */
  currentPath: string;
  /**
   * Render prop for each nav link — gives you full control over how
   * individual links are rendered (e.g. with react-router <Link>, next/link, etc.)
   */
  renderLink: (link: GaiaNavbarLink, isActive: boolean) => React.ReactNode;
}

export function GaiaNavbar({ section, currentPath, renderLink }: GaiaNavbarProps) {
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
          {section.links.map((link) =>
            renderLink(link, currentPath === link.path || currentPath.startsWith(link.path + "/"))
          )}
        </Box>
      </ScrollArea>
    </Box>
  );
}
