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

function resolveSubHeaderTitle(
  pathname: string,
  sections: GaiaNavbarSection[],
  resolveSection: (pathname: string) => string,
): string {
  const sectionTitle = resolveSection(pathname);
  const section = sections.find((s) => s.title === sectionTitle);
  if (!section) return sectionTitle;

  for (const link of section.links) {
    if (link.link && pathname.includes(link.link)) return link.label;
    if (link.links) {
      for (const child of link.links) {
        if (pathname.includes(child.link)) return child.label;
      }
    }
  }

  return sectionTitle;
}

export interface GaiaShellLayoutProps {
  /** Props forwarded to GaiaHeader */
  headerProps: Omit<GaiaHeaderProps, "burgerSlot">;
  /** Props forwarded to GaiaNavbar */
  navbarProps: GaiaNavbarProps;
  /**
   * When provided, renders a SubHeader bar above the main content.
   * Title is automatically resolved from the current pathname — you
   * only need to pass `content` for extra controls on the right side.
   */
  subHeaderProps?: SubHeaderProps;
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
    resolveSubHeaderTitle(
      pathname,
      navbarProps.sections,
      navbarProps.resolveSection,
    );

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
        <GaiaNavbar {...navbarProps} />
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
