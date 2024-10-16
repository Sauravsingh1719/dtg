import React from 'react';
import { Toast } from '@/hooks/use-toast';

interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-5 right-5 z-50 space-y-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-md px-4 py-3 shadow-lg max-w-sm transition duration-300 ease-in-out ${
            toast.type === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{toast.title}</p>
              {toast.description && (
                <p className="text-sm mt-1">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 text-gray-400 hover:text-gray-500"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
