import { createContext, useContext } from "react";

export interface GaiaRemoteConfigs {
  tropos?: { baseUrl: string };
  pleco?: { baseUrl: string };
  // Add more systems here
}

export interface GaiaShellUser {
  id: string;
  username: string;
  email: string;
  is_superuser: boolean;
  permissions: string[];
}

export interface GaiaShellContextValue {
  user: GaiaShellUser | null;
  setUser: (user: GaiaShellUser | null) => void;
  remotes: GaiaRemoteConfigs;
}

const GaiaShellContext = createContext<GaiaShellContextValue>({
  user: null,
  setUser: () => { },
  remotes: {},
});

// CONTEXT
export const useGaiaShellContext = () => useContext(GaiaShellContext);

// HOOK FOR SPECIFIC CONTEXT
export const useGaiaShellUser = () => useContext(GaiaShellContext).user;
export const useSetGaiaShellUser = () => useContext(GaiaShellContext).setUser;
export const useGaiaRemoteConfig = <K extends keyof GaiaRemoteConfigs>(
  remote: K
): GaiaRemoteConfigs[K] => {
  return useContext(GaiaShellContext).remotes[remote];
};

export { GaiaShellContext };