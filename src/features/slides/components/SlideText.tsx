import { useLanguage } from "../../../../hooks/useLanguage";
import type { Line } from "../types";

type Props = { lines: Line[] };

export function SlideText({ lines }: Props) {
  const { language } = useLanguage();

  return (
    <div className="mt-6 space-y-6">
      {lines.map((line, i) => (
        <div key={i} className="space-y-2">
          <p className="text-3xl font-light tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
            {line.jp}
          </p>

          <p className="text-lg text-gray-200">
            {line[language]}
          </p>
        </div>
      ))}
    </div>
  );
}
