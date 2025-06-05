import React from 'react';
import { 
  MapPin, 
  Trash2, 
  Package2, 
  FileCheck, 
  Calendar, 
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Settings
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useSettingsStore from '../../store/useSettingsStore';

interface ProgressIndicatorProps {
  onSettingsClick: () => void;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ onSettingsClick }) => {
  const { t } = useTranslation();
  const theme = useSettingsStore(state => state.theme);

  const steps = [
    {
      id: 'postcode',
      label: t('steps.postcode'),
      icon: <MapPin size={18} />,
      isActive: false,
      isCompleted: true,
    },
    {
      id: 'waste-type',
      label: t('steps.wasteType'),
      icon: <Trash2 size={18} />,
      isActive: false,
      isCompleted: true,
    },
    {
      id: 'select-skip',
      label: t('steps.selectSkip'),
      icon: <Package2 size={18} />,
      isActive: true,
      isCompleted: false,
    },
    {
      id: 'permit-check',
      label: t('steps.permitCheck'),
      icon: <FileCheck size={18} />,
      isActive: false,
      isCompleted: false,
    },
    {
      id: 'choose-date',
      label: t('steps.chooseDate'),
      icon: <Calendar size={18} />,
      isActive: false,
      isCompleted: false,
    },
    {
      id: 'payment',
      label: t('steps.payment'),
      icon: <CreditCard size={18} />,
      isActive: false,
      isCompleted: false,
    },
  ];

  const activeIndex = steps.findIndex(step => step.isActive);
  const previousStep = steps[activeIndex - 1];
  const nextStep = steps[activeIndex + 1];

  return (
    <div className="w-full bg-white dark:bg-gray-800 transition-colors duration-200">
      {/* Settings Button */}
      <button
        onClick={onSettingsClick}
        className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label={t('settings.title')}
      >
        <Settings className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>

      {/* Mobile Progress Indicator */}
      <div className="md:hidden px-4 py-3">
        <div className="flex items-center justify-between">
          {previousStep ? (
            <button className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
              <ChevronLeft size={16} className="mr-1" />
              {previousStep.label}
            </button>
          ) : (
            <div></div>
          )}
          
          <div className="flex flex-col items-center">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mb-1">
              {steps[activeIndex].icon}
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {steps[activeIndex].label}
            </span>
          </div>

          {nextStep ? (
            <button className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
              {nextStep.label}
              <ChevronRight size={16} className="ml-1" />
            </button>
          ) : (
            <div></div>
          )}
        </div>

        <div className="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div 
            className="h-1 bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${((activeIndex + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop Progress Indicator */}
      <div className="hidden md:block overflow-x-auto py-4">
        <div className="min-w-max flex items-center justify-between px-8 lg:px-0 mx-auto max-w-5xl">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div 
                  className={`
                    flex items-center justify-center w-10 h-10 rounded-full mb-1
                    transition-all duration-200
                    ${step.isActive 
                      ? 'bg-blue-600 text-white' 
                      : step.isCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}
                  `}
                  aria-current={step.isActive ? 'step' : undefined}
                >
                  {step.icon}
                </div>
                <span 
                  className={`
                    text-sm font-medium 
                    ${step.isActive 
                      ? 'text-blue-600 dark:text-blue-400 font-semibold' 
                      : step.isCompleted 
                        ? 'text-green-500 dark:text-green-400' 
                        : 'text-gray-500 dark:text-gray-400'}
                  `}
                >
                  {step.label}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div 
                  className={`
                    flex-1 h-0.5 mx-4
                    ${index < activeIndex 
                      ? 'bg-green-500' 
                      : 'bg-gray-200 dark:bg-gray-700'}
                  `}
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;