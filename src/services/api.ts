import type { Skip, ApiResponse } from '../types';

// Mock image URLs for development - in a real app, these would come from the API
const skipImages = {
  '4 Yard': 'https://images.pexels.com/photos/3934423/pexels-photo-3934423.jpeg?auto=compress&cs=tinysrgb&w=800',
  '6 Yard': 'https://images.pexels.com/photos/3934423/pexels-photo-3934423.jpeg?auto=compress&cs=tinysrgb&w=800',
  '8 Yard': 'https://images.pexels.com/photos/3934423/pexels-photo-3934423.jpeg?auto=compress&cs=tinysrgb&w=800',
  '10 Yard': 'https://images.pexels.com/photos/3934423/pexels-photo-3934423.jpeg?auto=compress&cs=tinysrgb&w=800',
  '12 Yard': 'https://images.pexels.com/photos/3934423/pexels-photo-3934423.jpeg?auto=compress&cs=tinysrgb&w=800',
  '14 Yard': 'https://images.pexels.com/photos/3934423/pexels-photo-3934423.jpeg?auto=compress&cs=tinysrgb&w=800',
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
    
    // Transform the API response directly since it's already an array
    return data.map((skip) => ({
      ...skip,
      id: `${skip.size}-${skip.price}`,
      image: skipImages[skip.size] || skipImages['4 Yard'], // Fallback to default
    }));
  } catch (error) {
    console.error('Error fetching skips:', error);
    throw error;
  }
};