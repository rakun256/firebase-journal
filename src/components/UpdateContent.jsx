import { useState } from "react";

export default function UpdateContent({
  title = "Bu öğe güncellensin mi?",
  defaultContent = "",
  onConfirm,
  onCancel,
}) {
  const [content, setContent] = useState(defaultContent);

  return (
    <div className="spcace-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">
        Bu öğe eski haline getirilemez. Güncellerken dikkat ediniz.
      </p>
      <div className="flex flex-col">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Yeni İçerik"
          className="h-28 w-full resize-y rounded-xl border border-border bg-surface px-3 py-2 text-text-primary placeholder:text-text-muted outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
        />
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="w-full rounded-xl bg-text-muted px-3 py-2 text-white transition hover:bg-text-link sm:w-auto cursor-pointer"
            onClick={onCancel}
          >
            Vazgeç
          </button>
          <button
            className="w-full rounded-xl border border-success px-3 py-2 text-success transition hover:bg-success hover:text-white sm:w-auto cursor-pointer"
            onClick={() => onConfirm(content)}
          >
            Evet, güncelle
          </button>
        </div>
      </div>
    </div>
  );
}
