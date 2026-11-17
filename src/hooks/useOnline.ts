import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

export function useOnline() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const parar = NetInfo.addEventListener((estado) => {
      setOnline(estado.isConnected !== false);
    });

    return parar;
  }, []);

  return online;
}