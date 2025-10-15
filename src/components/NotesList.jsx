import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  orderBy,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, "notes"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotes(list);
    });

    return unsub;
  }, [user.uid]);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "notes", id));
  };

  const handleUpdate = async (id, currentContent) => {
    const newContent = window.prompt("Yeni içerik:", currentContent ?? "");
    if (newContent == null) return; // iptal
    try {
      await updateDoc(doc(db, "notes", id), {
        content: newContent,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("updateDoc error:", err);
      alert("Güncelleme yapılamadı.");
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h3 className="mb-4 text-2xl font-semibold text-text-primary">
        Notlarım
      </h3>

      {notes.length === 0 && <p className="text-text-muted">Henüz not yok</p>}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {notes.map((n) => (
          <article
            key={n.id}
            className="rounded-2xl border border-border bg-surface p-4 shadow-sm shadow-shadow transition hover:bg-surface-hover"
          >
            <h4 className="line-clamp-1 font-[600] text-lg text-text-primary">
              {n.title || "Başlıksız"}
            </h4>
            <p className="mt-1 text-text-secondary">
              {n.content}
            </p>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <button
                onClick={() => handleUpdate(n.id, n.content)}
                className="w-full rounded-xl bg-primary px-3 py-2 text-white transition hover:bg-primary-hover sm:w-auto cursor-pointer"
              >
                Düzenle
              </button>
              <button
                onClick={() => handleDelete(n.id)}
                className="w-full rounded-xl border border-error px-3 py-2 text-error transition hover:bg-error hover:text-white sm:w-auto cursor-pointer"
              >
                Sil
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
