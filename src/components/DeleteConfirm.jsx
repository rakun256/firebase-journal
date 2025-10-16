export default function DeleteConfirm({ title = "Bu öğe silinsin mi?", onConfirm, onCancel }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">Bu işlem geri alınamaz. Devam etmek istiyor musun?</p>
      <div className="flex items-center justify-end gap-2">
        <button
          className="w-full rounded-xl bg-text-muted px-3 py-2 text-white transition hover:bg-text-link sm:w-auto cursor-pointer"
          onClick={onCancel}
        >
          Vazgeç
        </button>
        <button
          className="w-full rounded-xl border border-error px-3 py-2 text-error transition hover:bg-error hover:text-white sm:w-auto cursor-pointer"
          onClick={onConfirm}
        >
          Evet, sil
        </button>
      </div>
    </div>
  );
}