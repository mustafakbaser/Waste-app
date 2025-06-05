import React, { useState } from 'react';
import ProgressIndicator from '../../components/ProgressIndicator/ProgressIndicator';
import SkipGrid from '../../components/SkipGrid/SkipGrid';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import FilterBar from '../../components/FilterBar';
import Pagination from '../../components/Pagination/Pagination';
import FloatingCart from '../../components/FloatingCart/FloatingCart';
import EmptyState from '../../components/EmptyState/EmptyState';
import CompareModal from '../../components/CompareModal/CompareModal';
import CompareBar from '../../components/CompareBar/CompareBar';
import SettingsModal from '../../components/SettingsModal/SettingsModal';
import useSkips from '../../hooks/useSkips';
import useSkipFilters from '../../hooks/useSkipFilters';
import { useTranslation } from 'react-i18next';
import type { Skip } from '../../types';

const POSTCODE = 'LE10 1SH';
const AREA = 'Leicestershire';
const ITEMS_PER_PAGE = 6;

const SelectSkipPage: React.FC = () => {
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [compareSkips, setCompareSkips] = useState<Skip[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isCompareBarExpanded, setIsCompareBarExpanded] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { t } = useTranslation();
  
  const { skips, loading, error, retry } = useSkips(POSTCODE, AREA);
  const { 
    filters, 
    setFilters, 
    filteredSkips, 
    totalCount, 
    filteredCount 
  } = useSkipFilters(skips);

  const handleSelectSkip = (skip: Skip) => {
    setSelectedSkip(skip);
  };

  const handleCompareToggle = (skip: Skip) => {
    setCompareSkips(current => {
      const isSelected = current.some(s => s.id === skip.id);
      if (isSelected) {
        return current.filter(s => s.id !== skip.id);
      }
      if (current.length < 3) {
        const newSkips = [...current, skip];
        if (newSkips.length === 1) {
          setIsCompareBarExpanded(true);
        }
        return newSkips;
      }
      return current;
    });
  };

  const handleRemoveCompareSkip = (skip: Skip) => {
    setCompareSkips(current => current.filter(s => s.id !== skip.id));
  };

  const handleBack = () => {
    // In a real app, this would navigate back to the previous step
    console.log('Navigate back');
  };

  const handleContinue = () => {
    // In a real app, this would save the selection and navigate to the next step
    if (selectedSkip) {
      console.log('Continue with selected skip:', selectedSkip);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      sortBy: 'none',
      heavyWasteOnly: false,
      roadLegalOnly: false,
      searchTerm: ''
    });
    setCurrentPage(1);
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredSkips.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredSkips.length);
  const paginatedSkips = filteredSkips.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow-sm relative">
        <ProgressIndicator onSettingsClick={() => setIsSettingsOpen(true)} />
      </header>
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('skipSelection.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('skipSelection.subtitle')}
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <LoadingSpinner size="large" />
          </div>
        ) : error ? (
          <ErrorMessage message={error} onRetry={retry} />
        ) : (
          <>
            <FilterBar
              filters={filters}
              onFiltersChange={setFilters}
              skipCount={filteredCount}
              totalCount={totalCount}
            />

            {filteredSkips.length === 0 ? (
              <EmptyState onReset={handleResetFilters} />
            ) : (
              <>
                <SkipGrid 
                  skips={paginatedSkips}
                  selectedSkip={selectedSkip}
                  onSelectSkip={handleSelectSkip}
                  compareSkips={compareSkips}
                  onCompareToggle={handleCompareToggle}
                />
                {totalPages > 1 && (
                  <div className="mt-8 space-y-4">
                    <p className="text-center text-sm text-gray-600">
                      Showing {startIndex + 1}-{endIndex} of {filteredSkips.length} skips
                    </p>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>

      <FloatingCart
        selectedSkip={selectedSkip}
        onBack={handleBack}
        onContinue={handleContinue}
      />

      <CompareBar
        skips={compareSkips}
        onRemoveSkip={handleRemoveCompareSkip}
        onCompare={() => setIsCompareModalOpen(true)}
        isExpanded={isCompareBarExpanded}
        onToggleExpand={() => setIsCompareBarExpanded(!isCompareBarExpanded)}
      />

      <CompareModal
        skips={compareSkips}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};

export default SelectSkipPage;