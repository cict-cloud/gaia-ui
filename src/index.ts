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

// Hooks
export { useModalState } from "./hooks/useModalState";

// Drawer components
export { BaseDrawer } from "./components/drawers/BaseDrawer";
export type { BaseDrawerProps } from "./components/drawers/BaseDrawer";

// Modal components
export { BaseModal } from "./components/modals/BaseModal";
export type { BaseModalProps } from "./components/modals/BaseModal";

export { ConfirmModal } from "./components/modals/ConfirmModal";
export type { ConfirmModalProps } from "./components/modals/ConfirmModal";

// Table components
export { BaseTable } from "./components/tables/BaseTable";
export type {
  TableMetaTypes,
  PaginationMeta,
  DataTableColumn,
} from "./components/tables/BaseTable";

export { TableActions } from "./components/tables/actions/TableActions";
export type {
  TableActionsProps,
  TableAction,
} from "./components/tables/actions/TableActions";

// API REMOTE BASEQUERY
export { createRemoteBaseQuery } from "./api/createRemoteBaseQuery"
export { createRemoteConfigProvider } from "./api/createRemoteConfigProvider"