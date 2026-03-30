import { useState } from "react";
import { useComments } from "../../../hooks/useComments";

type Props = {
  slideId: number;
  open: boolean;
  closePanel: () => void;
};

export function CommentsPanel({ slideId, open, closePanel }: Props) {
  const { comments, loading, error, addComment, deleteComment } = useComments(slideId);
  const [text, setText] = useState("");

  if (!open) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl p-4 border-l border-gray-200">
      <h2 className="text-xl font-bold mb-4">Comments</h2>

      {loading && <p className="text-gray-500">Loading comments…</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="space-y-3 mb-4 max-h-[60vh] overflow-y-auto">
        {comments.length === 0 && !loading && (
          <p className="text-gray-500">No comments yet.</p>
        )}

        {comments.map((c) => (
          <div key={c.id} className="p-2 border rounded bg-gray-50 flex justify-between">
            <div>
              <p className="font-semibold text-sm">{c.user_name ?? "User"}</p>
              <p className="text-sm">{c.text}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(c.created_at).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => deleteComment(c.id)}
              className="text-red-600 font-bold hover:text-red-800 ml-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border rounded p-2 mb-2"
        placeholder="Write a comment…"
      />

      <button
        onClick={() => {
          if (text.trim().length === 0) return;
          addComment(text);
          setText("");
        }}
        className="w-full bg-red-600 text-white py-2 rounded mb-2 hover:bg-red-700"
      >
        Add Comment
      </button>

      <button
        onClick={closePanel}
        className="w-full bg-gray-300 py-2 rounded hover:bg-gray-400"
      >
        Close
      </button>
    </div>
  );
}
