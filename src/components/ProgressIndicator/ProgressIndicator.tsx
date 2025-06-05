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

  const steps = [
    {
      id: 'postcode',
      label: t('steps.postcode'),
      icon: <MapPin className="w-5 h-5" />,
      isActive: false,
      isCompleted: true,
    },
    {
      id: 'waste-type',
      label: t('steps.wasteType'),
      icon: <Trash2 className="w-5 h-5" />,
      isActive: false,
      isCompleted: true,
    },
    {
      id: 'select-skip',
      label: t('steps.selectSkip'),
      icon: <Package2 className="w-5 h-5" />,
      isActive: true,
      isCompleted: false,
    },
    {
      id: 'permit-check',
      label: t('steps.permitCheck'),
      icon: <FileCheck className="w-5 h-5" />,
      isActive: false,
      isCompleted: false,
    },
    {
      id: 'choose-date',
      label: t('steps.chooseDate'),
      icon: <Calendar className="w-5 h-5" />,
      isActive: false,
      isCompleted: false,
    },
    {
      id: 'payment',
      label: t('steps.payment'),
      icon: <CreditCard className="w-5 h-5" />,
      isActive: false,
      isCompleted: false,
    },
  ];

  const activeIndex = steps.findIndex(step => step.isActive);
  const previousStep = steps[activeIndex - 1];
  const nextStep = steps[activeIndex + 1];

  return (
    <div className="relative w-full bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      {/* Settings Button */}
      <button
        onClick={onSettingsClick}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full
          bg-gray-100 dark:bg-gray-700
          hover:bg-gray-200 dark:hover:bg-gray-600
          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
          transform hover:scale-105 active:scale-95
          transition-all duration-200"
        aria-label={t('settings.title')}
      >
        <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>

      {/* Mobile Progress Indicator */}
      <div className="md:hidden px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          {previousStep ? (
            <button 
              className="flex items-center text-gray-600 dark:text-gray-300 text-sm
                hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label={previousStep.label}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {previousStep.label}
            </button>
          ) : (
            <div />
          )}
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full 
              bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500
              flex items-center justify-center mb-2
              shadow-lg shadow-blue-500/20 dark:shadow-blue-400/20">
              {steps[activeIndex].icon}
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {steps[activeIndex].label}
            </span>
          </div>

          {nextStep ? (
            <button 
              className="flex items-center text-gray-600 dark:text-gray-300 text-sm
                hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label={nextStep.label}
            >
              {nextStep.label}
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          ) : (
            <div />
          )}
        </div>

        <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500
              rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((activeIndex + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop Progress Indicator */}
      <div className="hidden md:block overflow-x-auto">
        <div className="min-w-max flex items-center justify-between px-8 lg:px-0 mx-auto max-w-5xl py-6">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center group">
                <div 
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center mb-2
                    transform transition-all duration-200
                    ${step.isActive 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 scale-110 shadow-lg shadow-blue-500/20 dark:shadow-blue-400/20' 
                      : step.isCompleted 
                        ? 'bg-gradient-to-br from-green-500 to-green-600 dark:from-green-400 dark:to-green-500' 
                        : 'bg-gray-200 dark:bg-gray-700'}
                    ${!step.isActive && !step.isCompleted && 'group-hover:scale-105'}
                  `}
                  aria-current={step.isActive ? 'step' : undefined}
                >
                  <div className={`text-white transition-transform duration-200 
                    ${step.isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {step.icon}
                  </div>
                </div>
                <span className={`
                  text-sm font-medium transition-colors duration-200
                  ${step.isActive 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : step.isCompleted 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-gray-500 dark:text-gray-400'}
                `}>
                  {step.label}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div 
                  className={`
                    flex-1 h-0.5 mx-4 rounded-full transition-all duration-500
                    ${index < activeIndex 
                      ? 'bg-gradient-to-r from-green-500 to-green-600 dark:from-green-400 dark:to-green-500' 
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