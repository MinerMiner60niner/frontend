import { useState } from "react";

export function useToast() {
  const [message, setMessage] = useState<string | null>(null);

  function show(msg: string) {
    setMessage(msg);
  }

  function clear() {
    setMessage(null);
  }

  return { message, show, clear };
}
