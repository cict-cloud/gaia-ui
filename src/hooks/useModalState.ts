import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";

export function useModalState<T>() {
  const [data, setData] = useState<T | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const openWith = (value: T) => {
    setData(value);
    open();
  };

  const onExited = () => setData(null);

  return { data, opened, openWith, close, onExited };
}
