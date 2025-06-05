import { useState, useEffect } from 'react';
import { fetchSkips, ApiError } from '../services/api';
import type { Skip } from '../types';

interface UseSkipsResult {
  skips: Skip[];
  loading: boolean;
  error: {
    message: string;
    code?: string;
    status?: number;
  } | null;
  retry: () => void;
}

const useSkips = (postcode: string, area: string): UseSkipsResult => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<UseSkipsResult['error']>(null);

  const loadSkips = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchSkips(postcode, area);
      setSkips(data);
    } catch (err) {
      if (err instanceof ApiError) {
        setError({
          message: err.message,
          code: err.code,
          status: err.status
        });
      } else {
        setError({
          message: err instanceof Error ? err.message : 'An unexpected error occurred',
          code: 'UNKNOWN'
        });
      }
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