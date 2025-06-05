import type { Skip, ApiResponse, ApiSkip } from '../types';

// Supabase storage base URL for skip images
const SUPABASE_STORAGE_URL = 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes';

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Function to generate image URL based on skip size
const generateImageUrl = (size: number): string => {
  // Common skip sizes that might have images
  const commonSizes = [4, 6, 8, 10, 12, 14, 16, 20, 40];
  
  // If it's not a common size, try to find the closest one
  let actualSize = size;
  if (!commonSizes.includes(size)) {
    actualSize = commonSizes.reduce((prev, curr) => 
      Math.abs(curr - size) < Math.abs(prev - size) ? curr : prev
    );
    console.log(`Size ${size} not common, using ${actualSize} instead`);
  }
  
  const imageFileName = `${actualSize}-yarder-skip`;
  const fullUrl = `${SUPABASE_STORAGE_URL}/${imageFileName}`;
  console.log(`Generated image URL for size ${size}:`, fullUrl);
  return fullUrl;
};

// Function to format price with VAT included
const formatPrice = (priceBeforeVat: number, vat: number): string => {
  const vatAmount = (priceBeforeVat * vat) / 100;
  const totalPrice = priceBeforeVat + vatAmount;
  return `£${totalPrice.toFixed(2)}`;
};

// Function to format hire period
const formatHirePeriod = (days: number): string => {
  return `${days} day${days > 1 ? 's' : ''}`;
};

// Function to transform API skip to frontend skip
const transformSkip = (apiSkip: ApiSkip): Skip => {
  try {
    const vatAmount = (apiSkip.price_before_vat * apiSkip.vat) / 100;
    const totalPrice = apiSkip.price_before_vat + vatAmount;
    
    return {
      id: apiSkip.id.toString(),
      size: apiSkip.size,
      hirePeriod: formatHirePeriod(apiSkip.hire_period_days),
      price: formatPrice(apiSkip.price_before_vat, apiSkip.vat),
      priceBeforeVat: apiSkip.price_before_vat,
      vat: apiSkip.vat,
      totalPrice: totalPrice,
      image: generateImageUrl(apiSkip.size),
      allowedOnRoad: apiSkip.allowed_on_road,
      allowsHeavyWaste: apiSkip.allows_heavy_waste,
      transportCost: apiSkip.transport_cost,
      perTonneCost: apiSkip.per_tonne_cost,
    };
  } catch (error) {
    console.error('Error transforming skip data:', error);
    throw new ApiError('Failed to process skip data', undefined, 'TRANSFORM_ERROR');
  }
};

export const fetchSkips = async (postcode: string, area: string): Promise<Skip[]> => {
  if (!postcode || !area) {
    throw new ApiError('Postcode and area are required', 400, 'INVALID_PARAMS');
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(
      `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${encodeURIComponent(postcode)}&area=${encodeURIComponent(area)}`,
      {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = 'Failed to fetch skip data';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If error response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new ApiError(errorMessage, response.status);
    }

    if (response.status === 204) {
      return []; // No content
    }

    const data: ApiResponse = await response.json();
    
    if (!Array.isArray(data)) {
      throw new ApiError('Invalid data format received', undefined, 'INVALID_FORMAT');
    }

    return data.map(transformSkip);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (error.name === 'AbortError') {
      throw new ApiError('Request timed out', undefined, 'TIMEOUT');
    }
    if (!navigator.onLine) {
      throw new ApiError('No internet connection', undefined, 'OFFLINE');
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'An unexpected error occurred',
      undefined,
      'UNKNOWN'
    );
  }
};