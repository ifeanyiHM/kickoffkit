import { useEffect, useState } from "react";

export function useBrowserStorageState<T>(initialState: T, key: string) {
  const [value, setValue] = useState<T>(function () {
    const storedvalue = localStorage.getItem(key);
    return storedvalue ? JSON.parse(storedvalue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue] as const;
}
