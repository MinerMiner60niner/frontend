import { useSlides } from "./hooks/useSlides";
import { SlideViewer } from "./features/slides/components/SlideViewer";

import { Header } from "./components/Header";
import { LanguageProvider } from "../context/LanguageContext";
import { AuthProvider } from "./features/auth/AuthContext";

import { LoginModal } from "./components/LoginModal";

export default function App() {
  const { slides, loading, error } = useSlides();

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl">
        Loading…
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl text-red-600">
        {error}
      </div>
    );
  }

  return (
    <LanguageProvider>
      <AuthProvider>
        <Header />
        <LoginModal />
        <SlideViewer slides={slides} />
      </AuthProvider>
    </LanguageProvider>
  );
}
