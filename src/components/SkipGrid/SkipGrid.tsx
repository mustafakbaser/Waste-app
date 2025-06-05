import React from 'react';
import SkipCard from '../SkipCard/SkipCard';
import type { Skip } from '../../types';

interface SkipGridProps {
  skips: Skip[];
  selectedSkip: Skip | null;
  onSelectSkip: (skip: Skip) => void;
  compareSkips: Skip[];
  onCompareToggle: (skip: Skip) => void;
}

const SkipGrid: React.FC<SkipGridProps> = ({ 
  skips, 
  selectedSkip, 
  onSelectSkip,
  compareSkips,
  onCompareToggle
}) => {
  const compareEnabled = compareSkips.length < 3;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {skips.map((skip) => (
        <SkipCard
          key={skip.id}
          skip={skip}
          isSelected={selectedSkip?.id === skip.id}
          isCompareSelected={compareSkips.some(s => s.id === skip.id)}
          onSelect={onSelectSkip}
          onCompareToggle={onCompareToggle}
          compareEnabled={compareEnabled}
        />
      ))}
    </div>
  );
};

export default SkipGrid;