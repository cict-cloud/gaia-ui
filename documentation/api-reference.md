# API Reference

All types exported from `@converge-cloudops/gaia-ui`.

## GaiaShellLayout

```ts
import { GaiaShellLayout } from "@converge-cloudops/gaia-ui";
import type { GaiaShellLayoutProps } from "@converge-cloudops/gaia-ui";
```

```ts
interface GaiaShellLayoutProps {
  headerProps: Omit<GaiaHeaderProps, "burgerSlot">;
  navbarProps: GaiaNavbarProps;
  subHeaderProps?: Omit<SubHeaderProps, "title"> & { title?: string };
  headerHeight?: number;           // default: 50
  navbarWidth?: number;            // default: 240
  navbarBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl"; // default: "sm"
  children: React.ReactNode;
}
```

> When `subHeaderProps` is provided, `title` is auto-resolved from the active nav link. Pass `title` explicitly to override. `react-router` is required — `GaiaShellLayout` calls `useLocation()` internally.

---

## GaiaHeader

```ts
import { GaiaHeader } from "@converge-cloudops/gaia-ui";
import type {
  GaiaHeaderProps,
  GaiaHeaderMenuGroup,
  GaiaHeaderMenuItem,
} from "@converge-cloudops/gaia-ui";
```

```ts
interface GaiaHeaderProps {
  logoSrc?: string;              // default: built-in cloud logo
  logoAlt?: string;              // default: "Logo"
  title?: string;                // default: "GAIA"
  menuGroups?: GaiaHeaderMenuGroup[]; // default: []
  rightSection?: React.ReactNode;
  burgerSlot?: React.ReactNode;
}

interface GaiaHeaderMenuGroup {
  label: string;
  items: GaiaHeaderMenuItem[];
}

interface GaiaHeaderMenuItem {
  label: string;
  path: string;
}
```

---

## GaiaNavbar

```ts
import { GaiaNavbar } from "@converge-cloudops/gaia-ui";
import type {
  GaiaNavbarProps,
  GaiaNavbarSection,
  GaiaNavbarLink,
} from "@converge-cloudops/gaia-ui";
```

```ts
interface GaiaNavbarProps {
  sections: GaiaNavbarSection[];
  resolveSection: (pathname: string) => string;
}

interface GaiaNavbarSection {
  title: string;
  links: GaiaNavbarLink[];
}

interface GaiaNavbarLink {
  icon: Icon;                 // Tabler icon component
  label: string;
  link?: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}
```

> `GaiaNavbar` reads `pathname` internally via `useLocation()`. `react-router` is required.

---

## SubHeader

```ts
import { SubHeader } from "@converge-cloudops/gaia-ui";
import type { SubHeaderProps } from "@converge-cloudops/gaia-ui";
```

```ts
interface SubHeaderProps {
  title: string;
  content?: React.ReactNode;
}
```

---

## NavbarLinksGroup

```ts
import { NavbarLinksGroup } from "@converge-cloudops/gaia-ui";
import type {
  NavbarLinksGroupProps,
  NavbarLinksGroupItem,
} from "@converge-cloudops/gaia-ui";
```

```ts
interface NavbarLinksGroupProps {
  icon: Icon;                  // Tabler icon component
  label: string;
  link?: string;
  initiallyOpened?: boolean;
  links?: NavbarLinksGroupItem[];
  currentPath: string;
}

interface NavbarLinksGroupItem {
  label: string;
  link: string;
}
```

---

## GaiaShellProvider

```ts
import { GaiaShellProvider } from "@converge-cloudops/gaia-ui";
```

```ts
interface GaiaShellProviderProps {
  value: GaiaShellContextValue;
  children: React.ReactNode;
}
```

---

## GaiaShellContext

```ts
import {
  GaiaShellContext,
  useGaiaShellContext,
  useGaiaRemoteConfig,
} from "@converge-cloudops/gaia-ui";

import type {
  GaiaShellContextValue,
  GaiaShellUser,
  GaiaRemoteConfigs,
} from "@converge-cloudops/gaia-ui";
```

```ts
interface GaiaShellUser {
  id: string;
  username: string;
  email: string;
  is_superuser: boolean;
  permissions: string[];
}

interface GaiaRemoteConfigs {
  tropos?: { baseUrl: string };
  pleco?: { baseUrl: string };
}

interface GaiaShellContextValue {
  user: GaiaShellUser | null;
  remotes: GaiaRemoteConfigs;
}
```

**Hooks**

```ts
// Returns the full context value
function useGaiaShellContext(): GaiaShellContextValue

// Returns the config for a single named remote (type-narrowed)
function useGaiaRemoteConfig<K extends keyof GaiaRemoteConfigs>(
  remote: K
): GaiaRemoteConfigs[K]
```

---

## Package exports

```ts
// ESM
import { ... } from "@converge-cloudops/gaia-ui";

// CSS (import once at app entry)
import "@converge-cloudops/gaia-ui/styles.css";
```

The package ships dual-format bundles:

| Field | File |
|-------|------|
| `import` (ESM) | `dist/index.js` |
| `require` (CJS) | `dist/index.cjs` |
| `types` | `dist/index.d.ts` |
| CSS | `dist/gaia-ui.css` |
