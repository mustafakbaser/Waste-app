import React from 'react';
import { 
  MapPin, 
  Trash2, 
  Package2, 
  FileCheck, 
  Calendar, 
  CreditCard 
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

  return (
    <div className="w-full overflow-x-auto py-4">
      <div className="min-w-max flex items-center justify-between px-4 md:px-8 lg:px-0 mx-auto max-w-5xl">
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
                  text-xs md:text-sm font-medium 
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
                  flex-1 h-0.5 mx-2 md:mx-4
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
  );
};

export default ProgressIndicator;