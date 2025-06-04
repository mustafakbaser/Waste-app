import type { Skip, ApiResponse, ApiSkip } from '../types';

// Supabase storage base URL for skip images
const SUPABASE_STORAGE_URL = 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes';

// Function to generate image URL based on skip size
const generateImageUrl = (size: number): string => {
  const imageFileName = `${size}-yarder-skip`;
  return `${SUPABASE_STORAGE_URL}/${imageFileName}`;
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
};

export const fetchSkips = async (postcode: string, area: string): Promise<Skip[]> => {
  try {
    const response = await fetch(
      `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${area}`
    );
    
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    
    const data: ApiResponse = await response.json();
    
    // Transform the API response to frontend format
    const transformedSkips = data.map(transformSkip);
    
    return transformedSkips;
  } catch (error) {
    console.error('Error fetching skips:', error);
    throw error;
  }
};