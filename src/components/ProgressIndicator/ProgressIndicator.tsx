import React from 'react';
import { 
  MapPin, 
  Trash2, 
  Package2, 
  FileCheck, 
  Calendar, 
  CreditCard,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Step {
  id: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  isCompleted: boolean;
}

const ProgressIndicator: React.FC = () => {
  const steps: Step[] = [
    {
      id: 'postcode',
      label: 'Postcode',
      icon: <MapPin size={18} />,
      isActive: false,
      isCompleted: true,
    },
    {
      id: 'waste-type',
      label: 'Waste Type',
      icon: <Trash2 size={18} />,
      isActive: false,
      isCompleted: true,
    },
    {
      id: 'select-skip',
      label: 'Select Skip',
      icon: <Package2 size={18} />,
      isActive: true,
      isCompleted: false,
    },
    {
      id: 'permit-check',
      label: 'Permit Check',
      icon: <FileCheck size={18} />,
      isActive: false,
      isCompleted: false,
    },
    {
      id: 'choose-date',
      label: 'Choose Date',
      icon: <Calendar size={18} />,
      isActive: false,
      isCompleted: false,
    },
    {
      id: 'payment',
      label: 'Payment',
      icon: <CreditCard size={18} />,
      isActive: false,
      isCompleted: false,
    },
  ];

  // Find the active step index
  const activeIndex = steps.findIndex(step => step.isActive);
  const previousStep = steps[activeIndex - 1];
  const nextStep = steps[activeIndex + 1];

  return (
    <div className="w-full">
      {/* Mobile Progress Indicator */}
      <div className="md:hidden px-4 py-3">
        <div className="flex items-center justify-between">
          {previousStep ? (
            <button className="flex items-center text-gray-600 text-sm">
              <ChevronLeft size={16} className="mr-1" />
              {previousStep.label}
            </button>
          ) : (
            /* Empty div for spacing */
            <div></div>
          )}
          
          <div className="flex flex-col items-center">
            <div className="bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center mb-1">
              {steps[activeIndex].icon}
            </div>
            <span className="text-sm font-medium text-blue-700">
              {steps[activeIndex].label}
            </span>
          </div>

          {nextStep ? (
            <button className="flex items-center text-gray-600 text-sm">
              {nextStep.label}
              <ChevronRight size={16} className="ml-1" />
            </button>
          ) : (
            /* Empty div for spacing */
            <div></div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1 bg-gray-200 rounded-full">
          <div 
            className="h-1 bg-blue-700 rounded-full transition-all duration-300"
            style={{ 
              width: `${((activeIndex + 1) / steps.length) * 100}%` 
            }}
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
                      ? 'bg-blue-700 text-white' 
                      : step.isCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-500'}
                  `}
                  aria-current={step.isActive ? 'step' : undefined}
                >
                  {step.icon}
                </div>
                <span 
                  className={`
                    text-sm font-medium 
                    ${step.isActive 
                      ? 'text-blue-700 font-semibold' 
                      : step.isCompleted 
                        ? 'text-green-500' 
                        : 'text-gray-500'}
                  `}
                >
                  {step.label}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div 
                  className={`
                    flex-1 h-0.5 mx-4
                    ${index < steps.findIndex(s => s.isActive) 
                      ? 'bg-green-500' 
                      : 'bg-gray-200'}
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