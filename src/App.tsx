import { useSlides } from "./hooks/useSlides";
import { SlideViewer } from "./features/slides/components/SlideViewer";

import { Header } from "./components/Header";
import { LanguageProvider } from "../context/LanguageContext";
import { AuthProvider } from "./features/auth/AuthContext";

import { LoginModal } from "./components/LoginModal";
import { CommentsPanel } from "./features/comments/components/CommentsPanel";

import { Toast } from "./components/Toast";
import { useToast } from "./hooks/useToast";

export default function App() {
  const { slides, loading, error } = useSlides();
  const toast = useToast();

  if (loading)
    return <div className="w-full h-screen flex items-center justify-center text-xl">Loading…</div>;

  if (error)
    return <div className="w-full h-screen flex items-center justify-center text-xl text-red-600">{error}</div>;

  return (
    <LanguageProvider>
      <AuthProvider>
        <Header />

        <Toast message={toast.message} clear={toast.clear} />

        <LoginModal toast={toast} />
        <CommentsPanel slideId={slides[0]?.id ?? 1} toast={toast} />

        <SlideViewer slides={slides} />
      </AuthProvider>
    </LanguageProvider>
  );
}
