export interface Skip {
  id: string;
  size: string;
  hirePeriod: string;
  price: string;
  image: string;
}

export interface ApiResponse {
  skips: Skip[];
}