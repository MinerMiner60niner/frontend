import { useState } from "react";
import { useComments } from "../context/CommentsContext";

export function CommentsPanel() {
  const { open, closePanel, comments, addComment, deleteComment } = useComments();
  const [text, setText] = useState("");

  if (!open) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl p-4">
      <h2 className="text-xl font-bold mb-4">Comments</h2>

      <div className="space-y-2 mb-4 max-h-[60vh] overflow-y-auto">
        {comments.map((c) => (
          <div
            key={c.id}
            className="p-2 border rounded flex justify-between items-center"
          >
            <span>{c.text}</span>

            <button
              onClick={() => deleteComment(c.id)}
              className="text-red-600 font-bold hover:text-red-800"
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
          addComment(text);
          setText("");
        }}
        className="w-full bg-red-600 text-white py-2 rounded mb-2"
      >
        Add Comment
      </button>

      <button onClick={closePanel} className="w-full bg-gray-300 py-2 rounded">
        Close
      </button>
    </div>
  );
}
