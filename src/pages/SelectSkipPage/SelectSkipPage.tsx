import React, { useState } from 'react';
import ProgressIndicator from '../../components/ProgressIndicator/ProgressIndicator';
import SkipGrid from '../../components/SkipGrid/SkipGrid';
import Footer from '../../components/Footer/Footer';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import FilterBar from '../../components/FilterBar';
import Pagination from '../../components/Pagination/Pagination';
import useSkips from '../../hooks/useSkips';
import useSkipFilters from '../../hooks/useSkipFilters';
import type { Skip } from '../../types';

// These would normally come from app state or URL params
const POSTCODE = 'LE10 1SH';
const AREA = 'Leicestershire';
const ITEMS_PER_PAGE = 6;

const SelectSkipPage: React.FC = () => {
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
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
    <div className="min-h-screen bg-gray-50 pb-24">
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
            <SkipGrid 
              skips={paginatedSkips}
              selectedSkip={selectedSkip}
              onSelectSkip={handleSelectSkip}
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
      </main>
      
      <Footer
        selectedSkip={selectedSkip}
        onBack={handleBack}
        onContinue={handleContinue}
      />
    </div>
  );
};

export default SelectSkipPage;