import { useEffect, useState } from "react";
import { fetchSlides } from "./features/api";
import type { Slide } from "./features/slides/types";
import { SlideViewer } from "./features/slides/components/SlideViewer";

import { Header } from "./components/Header";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { CommentsProvider } from "./context/CommentsContext";

import { LoginModal } from "./components/LoginModal";
import { CommentsPanel } from "./components/CommentsPanel";

function App() {
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    fetchSlides().then(setSlides);
  }, []);

  if (slides.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl">
        Loading…
      </div>
    );
  }

  return (
    <LanguageProvider>
      <AuthProvider>
        <CommentsProvider>
          <Header />
          <LoginModal />
          <CommentsPanel />
          <SlideViewer slides={slides} />
        </CommentsProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
