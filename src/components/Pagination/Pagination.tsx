import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { t } = useTranslation();

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage <= 3) {
      pages.push(2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages
      );
    }

    return pages;
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="flex items-center justify-center space-x-2 mt-6 mb-8"
      role="navigation"
      aria-label={t('pagination.navigation')}
    >
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          relative inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium
          transition-all duration-300 ease-in-out
          shadow-sm hover:shadow-md
          disabled:cursor-not-allowed disabled:opacity-50
          ${currentPage === 1
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'}
        `}
        aria-label={t('pagination.previous')}
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      <div className="flex items-center space-x-2">
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {typeof page === 'string' ? (
              <span className="px-2 py-2 text-gray-500 dark:text-gray-400">...</span>
            ) : (
              <button
                onClick={() => handlePageClick(page)}
                className={`
                  relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg
                  transition-all duration-300 ease-in-out
                  shadow-sm hover:shadow-md
                  ${currentPage === page
                    ? 'z-10 bg-blue-600 dark:bg-blue-500 text-white border border-blue-600 dark:border-blue-500'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'}
                `}
                aria-current={currentPage === page ? 'page' : undefined}
                aria-label={t('pagination.page', { page })}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          relative inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium
          transition-all duration-300 ease-in-out
          shadow-sm hover:shadow-md
          disabled:cursor-not-allowed disabled:opacity-50
          ${currentPage === totalPages
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'}
        `}
        aria-label={t('pagination.next')}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </nav>
  );
};

export default Pagination;