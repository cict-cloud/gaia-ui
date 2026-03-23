// Layout components
export { GaiaHeader } from "./components/layouts/GaiaHeader";
export type {
  GaiaHeaderProps,
  GaiaHeaderMenuGroup,
  GaiaHeaderMenuItem,
} from "./components/layouts/GaiaHeader";

export { GaiaNavbar } from "./components/layouts/GaiaNavbar";
export type {
  GaiaNavbarProps,
  GaiaNavbarSection,
  GaiaNavbarLink,
} from "./components/layouts/GaiaNavbar";

export { GaiaShellLayout } from "./components/layouts/GaiaShellLayout";
export type { GaiaShellLayoutProps } from "./components/layouts/GaiaShellLayout";

export { NavbarLinksGroup } from "./components/links/NavbarLinksGroup";
export type {
  NavbarLinksGroupProps,
  NavbarLinksGroupItem,
} from "./components/links/NavbarLinksGroup";

export { SubHeader } from "./components/layouts/SubHeader";
export type { SubHeaderProps } from "./components/layouts/SubHeader";

// CONTEXT PROVIDER
export { GaiaShellProvider } from "./context/GaiaShellProvider";
export { useGaiaShellContext, useGaiaRemoteConfig, useGaiaShellUser, useSetGaiaShellUser } from "./context/GaiaShellContext";
export type { GaiaShellContextValue, GaiaRemoteConfigs, GaiaShellUser } from "./context/GaiaShellContext";

// API REMOTE BASEQUERY
export { createRemoteBaseQuery } from "./api/createRemoteBaseQuery"
export { createRemoteConfigProvider } from "./api/createRemoteConfigProvider"