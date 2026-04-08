import { AppShell, Burger, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useLocation } from "react-router";
import { GaiaHeader, type GaiaHeaderProps } from "../GaiaHeader";
import {
  GaiaNavbar,
  type GaiaNavbarProps,
  type GaiaNavbarSection,
} from "../GaiaNavbar";
import { SubHeader, type SubHeaderProps } from "../SubHeader";

function getNavKey(pathname: string, sections: GaiaNavbarSection[]): string {
  let bestMatch: { title: string; matchLength: number } | null = null;

  for (const section of sections) {
    for (const group of section.links) {
      if (group.link && pathname.startsWith(group.link)) {
        if (!bestMatch || group.link.length > bestMatch.matchLength) {
          bestMatch = { title: section.title, matchLength: group.link.length };
        }
      }
      group.links?.forEach((child) => {
        if (pathname.startsWith(child.link)) {
          if (!bestMatch || child.link.length > bestMatch.matchLength) {
            bestMatch = {
              title: section.title,
              matchLength: child.link.length,
            };
          }
        }
      });
    }
  }

  return bestMatch?.title ?? "";
}

function resolveSubHeaderTitle(
  pathname: string,
  sections: GaiaNavbarSection[],
  navKey: string,
): string {
  const section = sections.find((s) => s.title === navKey);
  if (!section) return navKey;

  for (const link of section.links) {
    if (link.link && pathname.startsWith(link.link)) return link.label;
    if (link.links) {
      for (const child of link.links) {
        if (pathname.startsWith(child.link)) return child.label;
      }
    }
  }

  return navKey;
}

export interface GaiaShellLayoutProps {
  /** Props forwarded to GaiaHeader */
  headerProps: Omit<GaiaHeaderProps, "burgerSlot">;
  /** Props forwarded to GaiaNavbar (excluding navKey, which is computed internally) */
  navbarProps: Omit<GaiaNavbarProps, "navKey">;
  /**
   * When provided, renders a SubHeader bar above the main content.
   * Title is automatically resolved from navKey — you only need to pass
   * `content` for extra controls on the right side, or override `title` explicitly.
   */
  subHeaderProps?: Omit<SubHeaderProps, "title"> & { title?: string };
  /** Header height in px. Defaults to 50 */
  headerHeight?: number;
  /** Navbar width in px. Defaults to 240 */
  navbarWidth?: number;
  /** Breakpoint at which the navbar collapses. Defaults to "sm" */
  navbarBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Main content */
  children: React.ReactNode;
}

export function GaiaShellLayout({
  headerProps,
  navbarProps,
  subHeaderProps,
  headerHeight = 50,
  navbarWidth = 240,
  navbarBreakpoint = "sm",
  children,
}: GaiaShellLayoutProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const { pathname } = useLocation();
  const navKey = getNavKey(pathname, navbarProps.sections);

  const burger = (
    <Burger
      opened={opened}
      onClick={toggle}
      color="white"
      size="sm"
      hiddenFrom={navbarBreakpoint}
    />
  );

  const subHeaderTitle =
    subHeaderProps?.title ??
    resolveSubHeaderTitle(pathname, navbarProps.sections, navKey);

  return (
    <AppShell
      header={{ height: headerHeight }}
      navbar={{
        width: navbarWidth,
        breakpoint: navbarBreakpoint,
        collapsed: { mobile: !opened },
      }}
      withBorder={false}
      padding={0}
    >
      <AppShell.Header>
        <GaiaHeader {...headerProps} burgerSlot={burger} />
      </AppShell.Header>

      <AppShell.Navbar>
        <GaiaNavbar {...navbarProps} navKey={navKey} />
      </AppShell.Navbar>

      <AppShell.Main bg="#f0f0f0">
        {subHeaderProps !== undefined && (
          <SubHeader {...subHeaderProps} title={subHeaderTitle} />
        )}
        <Container fluid p="md" h="inherit">
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
