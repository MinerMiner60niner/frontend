import { useLikes } from "../hooks/useLikes";

export function LikeButton({ slideId }: { slideId: number }) {
  const { likes, sendLike, error } = useLikes(slideId);

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={sendLike}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        ❤️ Like
      </button>

      <p className="text-sm mt-1">{likes} likes</p>

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
