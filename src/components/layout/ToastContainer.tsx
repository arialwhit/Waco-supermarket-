import { CheckCircle2, Info, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export function ToastContainer() {
  const { toasts, dismissToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-5 z-[95] flex flex-col gap-2 w-[calc(100vw-40px)] max-w-[340px]"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-[#141a4a] text-white rounded-[12px] px-4 py-3 flex items-start gap-3 transition-all duration-200"
        >
          {toast.tone === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-[#f7d23a] shrink-0 mt-0.5" />
          ) : (
            <Info className="w-4 h-4 text-[#f7d23a] shrink-0 mt-0.5" />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold leading-snug">{toast.title}</p>
            {toast.description && (
              <p className="text-xs text-white/75 mt-0.5 truncate">{toast.description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            aria-label="Dismiss notification"
            className="text-white/60 hover:text-white cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
