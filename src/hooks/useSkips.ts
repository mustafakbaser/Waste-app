import { useState, useEffect } from 'react';
import { fetchSkips } from '../services/api';
import type { Skip } from '../types';

interface UseSkipsResult {
  skips: Skip[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}

const useSkips = (postcode: string, area: string): UseSkipsResult => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadSkips = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchSkips(postcode, area);
      setSkips(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load skip options');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkips();
  }, [postcode, area]);

  return {
    skips,
    loading,
    error,
    retry: loadSkips
  };
};

export default useSkips;