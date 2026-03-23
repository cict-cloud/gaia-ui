import { useState } from "react";
import {
  GaiaShellContext,
  type GaiaShellContextValue,
  type GaiaShellUser,
} from "./GaiaShellContext";

interface Props {
  value: Omit<GaiaShellContextValue, "user" | "setUser">;
  children: React.ReactNode;
}

export function GaiaShellProvider({ value, children }: Props) {
  const [user, setUser] = useState<GaiaShellUser | null>(null);
  return (
    <GaiaShellContext.Provider value={{ ...value, user, setUser }}>
      {children}
    </GaiaShellContext.Provider>
  );
}
