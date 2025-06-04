export interface Skip {
  id: string;
  size: string;
  hirePeriod: string;
  price: string;
  image: string;
}

// Updated to reflect that the API returns an array directly
export type ApiResponse = Skip[];