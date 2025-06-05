import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import CallbackModal from '../CallbackModal/CallbackModal';

const FloatingCallButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-4 left-4 z-40
          bg-blue-600 dark:bg-blue-500
          hover:bg-blue-700 dark:hover:bg-blue-600
          text-white rounded-full p-4
          shadow-lg hover:shadow-xl
          transform hover:scale-110
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20"
        aria-label="Request callback"
      >
        <Phone className="h-6 w-6" />
      </button>

      <CallbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default FloatingCallButton;