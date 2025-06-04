// API Response interface matching the actual API structure
export interface ApiSkip {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

// Frontend Skip interface for components
export interface Skip {
  id: string;
  size: number;
  hirePeriod: string;
  price: string;
  priceBeforeVat: number;
  vat: number;
  totalPrice: number;
  image: string;
  allowedOnRoad: boolean;
  allowsHeavyWaste: boolean;
  transportCost: number | null;
  perTonneCost: number | null;
}

// API returns an array of ApiSkip objects
export type ApiResponse = ApiSkip[];