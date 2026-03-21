import { useState } from "react";
import type { Line } from "../types.ts";

type Props = { lines: Line[] };

export function SlideText({ lines }: Props) {
  const languages = ["lv", "en", "romaji"] as const;
  const [langIndex, setLangIndex] = useState(0);

  const lang = languages[langIndex];

  return (
    <div className="mt-6 space-y-6">

      {lines.map((line, i) => (
        <div key={i} className="space-y-2">
          <p className="text-3xl font-light tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
            {line.jp}
          </p>

          <p className="text-lg text-gray-200">
            {line[lang]}
          </p>
        </div>
      ))}

      <button
        onClick={() => setLangIndex((i) => (i + 1) % languages.length)}
        className="mt-4 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
      >
        {lang.toUpperCase()}
      </button>
    </div>
  );
}
