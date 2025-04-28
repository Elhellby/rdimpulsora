import React, { useEffect } from 'react';

const AlertMessage = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // 3 segundos

    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
  }, [onClose]);

  return (
    <div
      className={`position-fixed start-50 translate-middle-x bg-${type} text-white p-3 rounded shadow`}
      style={{ bottom: '20px', zIndex: 1050 }}
    >
      {message}
      <button
        type="button"
        className="btn-close btn-close-white ms-3 mt-1"
        onClick={onClose}
        aria-label="Close"
      ></button>
    </div>
  );
};

export default AlertMessage;