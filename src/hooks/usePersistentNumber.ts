import { useEffect, useState } from "react";

function readStoredNumber(key: string) {
  try {
    const stored = window.localStorage.getItem(key);
    const parsed = stored === null ? NaN : Number(stored);
    return Number.isFinite(parsed) ? parsed : 0;
  } catch {
    return 0;
  }
}

export default function usePersistentNumber(key: string) {
  const [value, setValue] = useState(() => readStoredNumber(key));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, String(value));
    } catch {
      return;
    }
  }, [key, value]);

  return [value, setValue] as const;
}
