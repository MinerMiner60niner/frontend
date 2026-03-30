import { useEffect } from "react";

type Props = {
  message: string | null;
  clear: () => void;
};

export function Toast({ message, clear }: Props) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => clear(), 2500);
    return () => clearTimeout(t);
  }, [message]);

  if (!message) return null;

  return (
    <div className="fixed top-[90px] left-1/2 -translate-x-1/2 z-[9999]">
      <div className="bg-black/80 text-white px-6 py-3 rounded-lg shadow-lg text-center text-lg">
        {message}
      </div>
    </div>
  );
}
