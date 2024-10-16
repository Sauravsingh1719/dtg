"use client"
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type ToastType = 'success' | 'error';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (toast: Omit<Toast, 'id'>) => {
    const id = uuidv4();
    setToasts((currentToasts) => [
      ...currentToasts,
      { id, ...toast },
    ]);
    
    // Automatically remove the toast after a delay
    setTimeout(() => {
      removeToast(id);
    }, 5000); // Adjust the duration as needed (5 seconds here)
  };

  const removeToast = (id: string) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  };

  return {
    toast,
    toasts,
    removeToast,
  };
}
