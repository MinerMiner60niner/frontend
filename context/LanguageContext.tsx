import { createContext, useContext, useState } from "react";

type Language = "lv" | "en" | "romaji";

type LanguageContextType = {
  language: Language;
  cycleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const languages: Language[] = ["lv", "en", "romaji"];
  const [index, setIndex] = useState(0);

  const cycleLanguage = () => {
    setIndex((i) => (i + 1) % languages.length);
  };

  return (
    <LanguageContext.Provider
      value={{
        language: languages[index],
        cycleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguageContext must be used inside LanguageProvider");
  return ctx;
}
