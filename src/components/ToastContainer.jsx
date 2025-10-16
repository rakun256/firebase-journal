export default function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-5 right-5 z-[2000] flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-xl px-4 py-3 text-white shadow-lg cursor-pointer transition-transform hover:scale-105 ${
            toast.type === "success"
              ? "bg-success"
              : toast.type === "error"
              ? "bg-error"
              : toast.type === "warning"
              ? "bg-warning text-black"
              : "bg-gray-800"
          }`}
          onClick={() => removeToast(toast.id)}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
