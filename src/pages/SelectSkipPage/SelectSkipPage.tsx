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
import useSkips from '../../hooks/useSkips';
import useSkipFilters from '../../hooks/useSkipFilters';
import type { Skip } from '../../types';

const POSTCODE = 'LE10 1SH';
const AREA = 'Leicestershire';
const ITEMS_PER_PAGE = 6;

const SelectSkipPage: React.FC = () => {
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [compareSkips, setCompareSkips] = useState<Skip[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  
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
        return [...current, skip];
      }
      return current;
    });
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <ProgressIndicator />
      </header>
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Choose Your Skip Size
          </h1>
          <p className="text-gray-600">
            Select the skip size that best suits your needs
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

            {/* Compare Button */}
            {compareSkips.length > 0 && (
              <div className="mb-6">
                <button
                  onClick={() => setIsCompareModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Compare {compareSkips.length} Skip{compareSkips.length > 1 ? 's' : ''}
                </button>
              </div>
            )}

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

      <CompareModal
        skips={compareSkips}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
      />
    </div>
  );
};

export default SelectSkipPage;