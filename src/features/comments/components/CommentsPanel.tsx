import { useState, useEffect } from "react";
import { useComments } from "../../../hooks/useComments";
import type { ApiError } from "../../../types/ApiError";
import { useAuth } from "../../../hooks/useAuth";

type Props = {
  slideId: number;
  toast: {
    show: (msg: string) => void;
  };
};

export function CommentsPanel({ slideId, toast }: Props) {
  const { user } = useAuth();
  const { comments, loading, error, addComment, deleteComment } = useComments(slideId);
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openHandler = () => setOpen(true);
    const closeHandler = () => setOpen(false);

    window.addEventListener("open-comments", openHandler);
    window.addEventListener("close-comments", closeHandler);

    return () => {
      window.removeEventListener("open-comments", openHandler);
      window.removeEventListener("close-comments", closeHandler);
    };
  }, []);

  if (!open) return null;

  async function handleAdd() {
    try {
      await addComment(text);
      toast.show("Jūs veiksmīgi aizsūtījāt komentāru!");
      setText("");
    } catch (error) {
      const err = error as ApiError;

      if (err.status === 404) toast.show("API nav atrodams (404)");
      else if (err.status === 500) toast.show("Servera kļūda (500)");
      else if (err.status === 504) toast.show("Gateway Timeout (504)");
      else toast.show("Neizdevās pievienot komentāru!");
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteComment(id);
      toast.show("Komentārs izdzēsts!");
    } catch (error) {
      const err = error as ApiError;

      if (err.status === 404) toast.show("API nav atrodams (404)");
      else if (err.status === 500) toast.show("Servera kļūda (500)");
      else toast.show("Jūsu mēģinājums izdzēst radīja kļūmi!");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center pt-[110px] bg-gradient-to-b from-black/70 via-black/50 to-black/20">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-[450px] max-h-[75vh] overflow-y-auto">

        <h2 className="text-xl font-bold mb-4">Comments</h2>

        {loading && <p>Loading comments…</p>}
        {error && <p className="text-red-600">{error}</p>}

        <div className="space-y-3 mb-4">
          {comments.map((c) => (
            <div key={c.id} className="p-2 border rounded bg-gray-50">
              <p className="font-semibold">
                {c.userId === user?.id ? user.email : `User #${c.userId}`}
              </p>

              <p>{c.text}</p>

              <button
                onClick={() => handleDelete(c.id)}
                className="text-red-600 font-bold hover:text-red-800 mt-1"
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
          onClick={handleAdd}
          className="w-full bg-red-600 text-white py-2 rounded mb-2 hover:bg-red-700"
        >
          Add Comment
        </button>

        <button
          onClick={() => setOpen(false)}
          className="w-full bg-gray-300 py-2 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
}
