import { createContext, useContext, useState } from "react";

type Comment = {
  id: number;
  text: string;
};

type CommentsContextType = {
  comments: Comment[];
  addComment: (text: string) => void;
  deleteComment: (id: number) => void;   // ← PIEVIENOTS
  open: boolean;
  openPanel: () => void;
  closePanel: () => void;
};

const CommentsContext = createContext<CommentsContextType | null>(null);

export function CommentsProvider({ children }: { children: React.ReactNode }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [open, setOpen] = useState(false);

  const addComment = (text: string) => {
    setComments((prev) => [...prev, { id: Date.now(), text }]);
  };

  const deleteComment = (id: number) => {     // ← PIEVIENOTS
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <CommentsContext.Provider
      value={{
        comments,
        addComment,
        deleteComment,   // ← PIEVIENOTS
        open,
        openPanel: () => setOpen(true),
        closePanel: () => setOpen(false),
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}

export function useComments() {
  const ctx = useContext(CommentsContext);
  if (!ctx) throw new Error("useComments must be inside CommentsProvider");
  return ctx;
}
