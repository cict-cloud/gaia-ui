import { createContext, useContext } from "react";

export interface GaiaRemoteConfigs {
  tropos?: { baseUrl: string };
  pleco?: { baseUrl: string };
  // Add more systems here
}

type Department = {
  code: string;
  name: string;
};

export interface GaiaShellUser {
  id: string;
  username: string;
  email: string;
  is_superuser: boolean;
  permissions: string[];
}

export interface GaiaShellContextValue {
  user: GaiaShellUser | null;
  remotes: GaiaRemoteConfigs;
}

const GaiaShellContext = createContext<GaiaShellContextValue>({
  user: null,
  remotes: {},
});

export const useGaiaShellContext = () => useContext(GaiaShellContext);

export const useGaiaRemoteConfig = <K extends keyof GaiaRemoteConfigs>(
  remote: K
): GaiaRemoteConfigs[K] => {
  return useContext(GaiaShellContext).remotes[remote];
};

export { GaiaShellContext };