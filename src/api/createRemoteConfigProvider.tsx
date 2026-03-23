import { useState, useEffect, type ReactNode } from "react";
import {
  useGaiaRemoteConfig,
  type GaiaRemoteConfigs,
} from "../context/GaiaShellContext";

export function createRemoteConfigProvider(
  remote: keyof GaiaRemoteConfigs,
  setBaseUrl: (url: string) => void,
  standaloneUrl: string,
) {
  return function RemoteConfigProvider({ children }: { children: ReactNode }) {
    const config = useGaiaRemoteConfig(remote);
    const [ready, setReady] = useState(false);

    useEffect(() => {
      setBaseUrl(config?.baseUrl ?? standaloneUrl);
      setReady(true);
    }, [config?.baseUrl]);

    if (!ready) return null;

    return <>{children}</>;
  };
}
