import React from 'react';
import { useNotification } from '../hooks/useNotification';

export default function NotificationContainer() {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="notification-enter"
          style={{
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            cursor: 'pointer',
            fontWeight: 'bold',
            backgroundColor: 
              notification.type === 'success' ? '#22c55e' :
              notification.type === 'error' ? '#ef4444' : '#3b82f6',
            color: 'white'
          }}
          onClick={() => removeNotification(notification.id)}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
}