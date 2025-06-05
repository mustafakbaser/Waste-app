import React from 'react';
import { AlertTriangle, WifiOff, Clock, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  code?: string;
  status?: number;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, code, status, onRetry }) => {
  const getIcon = () => {
    switch (code) {
      case 'OFFLINE':
        return <WifiOff className="h-5 w-5 text-red-600" />;
      case 'TIMEOUT':
        return <Clock className="h-5 w-5 text-red-600" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
    }
  };

  const getTitle = () => {
    switch (code) {
      case 'OFFLINE':
        return 'No Internet Connection';
      case 'TIMEOUT':
        return 'Request Timed Out';
      case 'INVALID_PARAMS':
        return 'Invalid Parameters';
      case 'TRANSFORM_ERROR':
        return 'Data Processing Error';
      default:
        return status ? `Error ${status}` : 'Error Loading Data';
    }
  };

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 my-4">
      <div className="flex">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-300">
            {getTitle()}
          </h3>
          <div className="mt-2 text-sm text-red-700 dark:text-red-400">
            <p>{message}</p>
          </div>
          {onRetry && (
            <div className="mt-4">
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center px-4 py-2 rounded-lg
                  text-sm font-medium
                  bg-red-100 dark:bg-red-900/50
                  text-red-700 dark:text-red-300
                  hover:bg-red-200 dark:hover:bg-red-900/70
                  focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400
                  transition-colors"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;