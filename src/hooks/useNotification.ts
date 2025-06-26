import { useState, useCallback } from 'react';

interface Notification {
  message: string;
  type: 'success' | 'error' | 'info';
  id: number;
}

let globalNotifications: Notification[] = [];
let globalListeners: ((notifications: Notification[]) => void)[] = [];

const updateAllListeners = () => {
  globalListeners.forEach(listener => listener([...globalNotifications]));
};

export function useNotification() {
  const [notifications, setNotifications] = useState<Notification[]>(globalNotifications);

  // S'abonner aux changements globaux
  const updateNotifications = useCallback((newNotifications: Notification[]) => {
    setNotifications(newNotifications);
  }, []);

  // Ajouter cet écouteur à la liste globale s'il n'y est pas déjà
  if (!globalListeners.includes(updateNotifications)) {
    globalListeners.push(updateNotifications);
  }

  const addNotification = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now() + Math.random(); // ID plus unique
    const notification = { message, type, id };
    
    globalNotifications = [...globalNotifications, notification];
    updateAllListeners();
    
    // Auto-suppression après 4 secondes
    setTimeout(() => {
      globalNotifications = globalNotifications.filter(n => n.id !== id);
      updateAllListeners();
    }, 4000);
  }, []);

  const removeNotification = useCallback((id: number) => {
    globalNotifications = globalNotifications.filter(n => n.id !== id);
    updateAllListeners();
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
    success: useCallback((message: string) => addNotification(message, 'success'), [addNotification]),
    error: useCallback((message: string) => addNotification(message, 'error'), [addNotification]),
    info: useCallback((message: string) => addNotification(message, 'info'), [addNotification])
  };
}