export interface ProductSummary {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  thumbnailUrl: string;
  inStock: boolean;
}

export interface Product extends ProductSummary {
  sku: string;
  description: string;
  highlights: string[];
  images: string[];
}

export interface SearchResult {
  total: number;
  hits: ProductSummary[];
}

// Raw shape returned by ElasticSearch _search endpoint
export interface ElasticSearchResponse {
  hits: {
    total: number | { value: number; relation: string };
    hits: Array<{
      _id: string;
      _source: ProductSummary;
    }>;
  };
}
