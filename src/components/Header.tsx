import { useLanguage } from "../hooks/useLanguage";
import { useAuth } from "../features/auth/AuthContext";

export function Header() {
  const { language, cycleLanguage } = useLanguage();
  const { user, openLogin, closeLogin, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 w-full z-40 flex justify-center mt-4">
      <div className="flex items-center gap-6 px-6 py-2 bg-black/40 backdrop-blur-md rounded-lg text-white text-lg">

        {/* Comments */}
        <button
          onClick={() => {
            closeLogin(); // lai nepārklājas
            window.dispatchEvent(new CustomEvent("open-comments"));
          }}
          className="hover:opacity-80 transition"
        >
          💬 Comments
        </button>

        {/* Login / Logout */}
        {user ? (
          <button
            onClick={logout}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <span className="text-2xl">👤</span>
            <span>{user.name} (Logout)</span>
          </button>
        ) : (
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent("close-comments"));
              openLogin();
            }}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <span className="text-2xl">👤</span>
            <span>Login</span>
          </button>
        )}

        {/* Language */}
        <button
          onClick={cycleLanguage}
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <span className="text-2xl">🌐</span>
          <span>{language.toUpperCase()}</span>
        </button>
      </div>
    </header>
  );
}
