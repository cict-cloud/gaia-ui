import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { GaiaHeader, GaiaHeaderProps } from "../GaiaHeader";
import { GaiaNavbar, GaiaNavbarProps } from "../GaiaNavbar";

export interface GaiaShellLayoutProps {
  /** Props forwarded to GaiaHeader */
  headerProps: Omit<GaiaHeaderProps, "burgerSlot">;
  /** Props forwarded to GaiaNavbar */
  navbarProps: GaiaNavbarProps;
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
  headerHeight = 50,
  navbarWidth = 240,
  navbarBreakpoint = "sm",
  children,
}: GaiaShellLayoutProps) {
  const [opened, { toggle }] = useDisclosure(false);

  const burger = (
    <Burger
      opened={opened}
      onClick={toggle}
      color="white"
      size="sm"
      hiddenFrom={navbarBreakpoint}
    />
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
      padding={20}
    >
      <AppShell.Header>
        <GaiaHeader {...headerProps} burgerSlot={burger} />
      </AppShell.Header>

      <AppShell.Navbar>
        <GaiaNavbar {...navbarProps} />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
