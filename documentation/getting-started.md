# Getting Started

## Installation

```bash
npm install @converge-cloudops/gaia-ui
```

## Peer dependencies

`gaia-ui` does **not** bundle React, Mantine, or Tabler Icons. Install the exact required versions alongside:

```bash
npm install react@19.2.4 react-dom@19.2.4 @mantine/core@8.3.14 @mantine/hooks@8.3.14 @tabler/icons-react@3.36.0
```

`GaiaNavbar`, `GaiaShellLayout`, and `NavbarLinksGroup` use `react-router` for navigation links. If your project uses React Router, install the exact required version too:

```bash
npm install react-router@7.9.1
```

If you do not use React Router, pass a static `currentPath` string and avoid using `NavbarLinksGroup` directly (it imports `Link` from `react-router` unconditionally).

## Required: import the stylesheet

The component styles are shipped as a single CSS file. Import it once at your app entry point:

```tsx
import "@converge-cloudops/gaia-ui/styles.css";
```

## Required: PostCSS setup

`NavbarLinksGroup` uses Mantine's `@mixin hover` PostCSS mixin. Your project's `postcss.config.cjs` (or equivalent) must include `postcss-preset-mantine`:

```js
module.exports = {
  plugins: {
    "postcss-preset-mantine": {},
    "postcss-simple-vars": {
      variables: {
        "mantine-breakpoint-xs": "36em",
        "mantine-breakpoint-sm": "48em",
        "mantine-breakpoint-md": "62em",
        "mantine-breakpoint-lg": "75em",
        "mantine-breakpoint-xl": "88em",
      },
    },
  },
};
```

This is standard for any Mantine v7+ / v8+ project.

## Required: `convergeTeal` custom color

Active and hovered nav links use the `convergeTeal` Mantine color token. Register it in your `MantineProvider` theme:

```tsx
import { MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({
  colors: {
    convergeTeal: [
      // 10-step palette, index 4 is the primary shade
      "#E6F4F4", // 0 - very light background
      "#CDE9E9", // 1
      "#9AC0C3", // 2 - soft tint (your provided soft color)
      "#6FAFB2", // 3
      "#3F9C9B", // 4
      "#038F8D", // 5 - main brand color
      "#027574", // 6 - active button
      "#026160", // 7 - darker state
      "#024645", // 8 - hover / deep emphasis
      "#013736", // 9 - darkest
    ],
  },
  primaryColor: "convergeTeal",
});

function App() {
  return <MantineProvider theme={theme}>{/* your app */}</MantineProvider>;
}
```

## Minimal working example

```tsx
import "@mantine/core/styles.css";
import "@converge-cloudops/gaia-ui/styles.css";

import { MantineProvider, createTheme } from "@mantine/core";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { GaiaShellLayout } from "@converge-cloudops/gaia-ui";
import { IconLayoutDashboard } from "@tabler/icons-react";

const theme = createTheme({
  colors: {
    convergeTeal: [
      "#E6F4F4", // 0 - very light background
      "#CDE9E9", // 1
      "#9AC0C3", // 2
      "#6FAFB2", // 3
      "#3F9C9B", // 4
      "#038F8D", // 5 - main brand color
      "#027574", // 6 - active button
      "#026160", // 7 - darker state
      "#024645", // 8 - hover / deep emphasis
      "#013736", // 9 - darkest
    ],
  },
  primaryColor: "convergeTeal",
});

const sections = [
  {
    title: "Dashboard",
    links: [{ icon: IconLayoutDashboard, label: "Overview", link: "/" }],
  },
];

function Shell() {
  return (
    <GaiaShellLayout
      headerProps={{ title: "My App" }}
      navbarProps={{
        sections,
        resolveSection: () => "Dashboard",
      }}
    >
      <Outlet />
    </GaiaShellLayout>
  );
}

const router = createBrowserRouter([
  {
    element: <Shell />,
    children: [
      { path: "/", element: <div>Hello</div> },
    ],
  },
]);

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
```
