import { useState, useMemo } from 'react';
import type { Skip } from '../types';
import type { FilterState } from '../components/FilterBar';

const useSkipFilters = (skips: Skip[]) => {
  const [filters, setFilters] = useState<FilterState>({
    sortBy: 'none',
    heavyWasteOnly: false,
    roadLegalOnly: false,
    searchTerm: ''
  });
  const filteredAndSortedSkips = useMemo(() => {
    let result = [...skips];

    // Apply search filter
    if (filters.searchTerm.trim()) {
      const searchTerm = filters.searchTerm.toLowerCase().trim();
      result = result.filter(skip => 
        skip.size.toString().includes(searchTerm) ||
        `${skip.size} yard`.toLowerCase().includes(searchTerm) ||
        `${skip.size}yd`.toLowerCase().includes(searchTerm)
      );
    }

    // Apply heavy waste filter
    if (filters.heavyWasteOnly) {
      result = result.filter(skip => skip.allowsHeavyWaste);
    }

    // Apply road legal filter
    if (filters.roadLegalOnly) {
      result = result.filter(skip => skip.allowedOnRoad);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.totalPrice - b.totalPrice);
        break;
      case 'price-desc':
        result.sort((a, b) => b.totalPrice - a.totalPrice);
        break;
      case 'size-asc':
        result.sort((a, b) => a.size - b.size);
        break;
      case 'size-desc':
        result.sort((a, b) => b.size - a.size);
        break;
      default:
        // No sorting applied
        break;
    }

    return result;
  }, [skips, filters]);

  return {
    filters,
    setFilters,
    filteredSkips: filteredAndSortedSkips,
    totalCount: skips.length,
    filteredCount: filteredAndSortedSkips.length
  };
};

export default useSkipFilters;
