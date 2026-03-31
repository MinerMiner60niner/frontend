import { useLikes } from "../hooks/useLikes";

export function LikeButton({ slideId }: { slideId: number }) {
  // Pievienojam isLiked, ko nupat ielikām hookā
  const { likes, isLiked, sendLike, error } = useLikes(slideId);

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={sendLike}
        className={`px-4 py-2 rounded transition-colors ${
          isLiked 
            ? "bg-red-700 text-white shadow-inner" 
            : "bg-red-500 text-white hover:bg-red-600"
        }`}
      >
        {isLiked ? "❤️ Liked" : "🤍 Like"}
      </button>

      <p className="text-sm mt-1 font-medium">{likes} likes</p>

      {error && <p className="text-xs text-red-600 mt-1 bg-red-100 px-2 py-1 rounded">{error}</p>}
    </div>
  );
}