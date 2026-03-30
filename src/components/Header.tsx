import { useLanguage } from "../hooks/useLanguage";
import { useAuth } from "../features/auth/AuthContext";

export function Header() {
  const { language, cycleLanguage } = useLanguage();
  const { user, openLogin, logout } = useAuth();

  return (
    <header
      className="
        w-full 
        h-[35px]
        flex 
        items-center 
        justify-between
        px-6
        text-white
      "
      style={{
        backgroundColor: "rgba(179, 0, 0, 0.85)",
      }}
    >
      {/* Kreisā puse */}
      <div className="text-xl font-bold select-none"></div>

      {/* Labā puse */}
      <div className="flex items-center gap-6 text-lg">

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
            onClick={openLogin}
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
