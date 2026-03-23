import {
  GaiaShellContext,
  type GaiaShellContextValue,
} from "./GaiaShellContext";

interface Props {
  value: GaiaShellContextValue;
  children: React.ReactNode;
}

export function GaiaShellProvider({ value, children }: Props) {
  return (
    <GaiaShellContext.Provider value={value}>
      {children}
    </GaiaShellContext.Provider>
  );
}
