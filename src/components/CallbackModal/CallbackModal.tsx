import React, { useState } from 'react';
import { Phone, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Toast from '@radix-ui/react-toast';
import { useTranslation } from 'react-i18next';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CallbackModal: React.FC<CallbackModalProps> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const { t } = useTranslation();

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^[\d\s()-+]{10,}$/;
    return phoneRegex.test(number.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePhoneNumber(phoneNumber)) {
      setShowToast(true);
      onClose();
      setPhoneNumber('');
      setTimeout(() => setShowToast(false), 5000);
    } else {
      setIsValid(false);
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    setIsValid(true);
  };

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={onClose}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md
            bg-white dark:bg-gray-800 rounded-xl shadow-xl z-50 p-6
            animate-in fade-in-0 zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white">
                {t('callback.title')}
              </Dialog.Title>
              <Dialog.Close className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                <X className="h-5 w-5" />
              </Dialog.Close>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('callback.subtitle')}
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder={t('callback.placeholder')}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isValid
                      ? 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'
                      : 'border-red-500 dark:border-red-500'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                    placeholder-gray-500 dark:placeholder-gray-400
                    focus:ring-2 ${
                      isValid
                        ? 'focus:ring-blue-500/20 dark:focus:ring-blue-400/20'
                        : 'focus:ring-red-500/20'
                    }
                    outline-none transition-all duration-200`}
                />
                {!isValid && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {t('callback.validation')}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 dark:bg-blue-500
                  hover:bg-blue-700 dark:hover:bg-blue-600
                  text-white font-medium rounded-lg
                  transform transition-all duration-200
                  hover:scale-[1.02] active:scale-[0.98]
                  focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20"
              >
                {t('callback.button')}
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Toast.Provider>
        <Toast.Root
          open={showToast}
          onOpenChange={setShowToast}
          className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800
            rounded-lg shadow-lg border border-gray-200 dark:border-gray-700
            p-4 animate-in fade-in-0 zoom-in-95 duration-200"
        >
          <Toast.Title className="text-sm font-medium text-gray-900 dark:text-white">
            {t('callback.toast.title')}
          </Toast.Title>
          <Toast.Description className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {t('callback.toast.description')}
          </Toast.Description>
        </Toast.Root>
        <Toast.Viewport />
      </Toast.Provider>
    </>
  );
};

export default CallbackModal;