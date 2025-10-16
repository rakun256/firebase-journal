import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const { showToast } = useToast();

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    await addDoc(collection(db, "notes"), {
      title,
      content,
      uid: user.uid,
      createdAt: serverTimestamp(),
    });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleAdd} className="mb-5 space-y-3 flex flex-col items-center justify-center">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Başlık"
        className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-text-primary placeholder:text-text-muted outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="İçerik (isteğe bağlı)"
        className="h-28 w-full resize-y rounded-xl border border-border bg-surface px-3 py-2 text-text-primary placeholder:text-text-muted outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        onClick={() => showToast("Not eklendi!", "success")}
        className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-white shadow-sm shadow-shadow transition hover:bg-primary-hover cursor-pointer"
      >
        Not Ekle
      </button>
    </form>
  );
}
