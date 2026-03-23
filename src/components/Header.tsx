import { useLanguage } from "../hooks/useLanguage";
import { useAuth } from "../context/AuthContext";
import { useComments } from "../context/CommentsContext";

export function Header() {
  const { language, cycleLanguage } = useLanguage();
  const { openLogin } = useAuth();
  const { openPanel } = useComments();

  return (
    <header
      className="
        w-full 
        h-[90px]
        flex 
        items-center 
        justify-between
        px-6
        text-white
      "
      style={{
        backgroundColor: "rgba(179, 0, 0, 0.85)", // tumši sarkans
      }}
    >
      {/* Kreisā puse (tukša — vieta logo, ja vēlāk vajadzēs) */}
      <div className="text-xl font-bold select-none"></div>

      {/* Pogas labajā pusē */}
      <div className="flex items-center gap-6 text-lg">

        {/* Login */}
        <button
          onClick={openLogin}
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <span className="text-2xl">👤</span>
          <span>Login</span>
        </button>

        {/* Comments */}
        <button
          onClick={openPanel}
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <span className="text-2xl">💬</span>
          <span>Comments</span>
        </button>

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
