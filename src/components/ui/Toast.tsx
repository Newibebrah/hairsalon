import { useState, createContext, useContext } from 'react';
import { XIcon, CheckCircleIcon, AlertCircleIcon, InfoIcon } from '@/components/icons/SocialIcons';
import { cn } from '@/lib/utils';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  toast: (toast: Omit<Toast, 'id'>) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export { ToastContext };

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);

    if (toast.duration !== 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, toast.duration ?? 5000);
    }

    return id;
  };

  const dismiss = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[1000] flex flex-col gap-3 pointer-events-none" role="region" aria-live="polite" aria-label="Notifikasi">
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} />
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  );
}

interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

function ToastItem({ toast, onClose }: ToastItemProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 200);
  };

  return (
    <div
      className={cn(
        'flex items-start gap-3 w-full max-w-sm p-4 rounded-xl shadow-xl border animate-in slide-in-from-right',
        'transition-all duration-200 ease-out',
        isExiting && 'animate-out fade-out slide-out-to-right',
        'bg-white border border-gray-200',
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5" aria-hidden="true">
          {({ success: <CheckCircleIcon className="w-5 h-5 text-green-500" />, error: <AlertCircleIcon className="w-5 h-5 text-red-500" />, info: <InfoIcon className="w-5 h-5 text-blue-500" />, warning: <AlertCircleIcon className="w-5 h-5 text-yellow-500" /> } as Record<string, React.ReactNode>)[toast.type]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm">{toast.title}</p>
          <p className="text-sm opacity-90 mt-0.5">{toast.message}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setIsExiting(true);
            setTimeout(onClose, 200);
          }}
          className="flex-shrink-0 p-1 rounded-lg hover:bg-black/10 transition-colors"
          aria-label="Tutup notifikasi"
        >
          <XIcon className="w-4 h-4 opacity-50 hover:opacity-100" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}