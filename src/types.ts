import type { Dispatch, SetStateAction } from 'react';

export type SortOrder = 'asc' | 'desc';

export type ModalityFilter = 'all' | 'with-excess' | 'without-excess';

export interface TariffFeature {
  description: string;
  icon?: string;
  color?: string;
}

export interface TariffModality {
  id: number;
  name: string;
}

export interface Product {
  id: string;
  company: string;
  modality: TariffModality;
  price: number;
  final_price: number;
  excess: number;
  logo: string;
  grade: {
    total: number;
  };
  features: TariffFeature[];
  /** Present in the UI alt text; sample data uses `company` instead. */
  name?: string;
}

/** Fields the price/excess/final-price filter actually reads. */
export interface FilterableProduct {
  price: number;
  final_price: number;
  excess: number;
}

export interface Filters {
  finalPrice: 0 | 1;
  modality: ModalityFilter | string;
  /** Empty string in the form; tests also pass numbers. */
  minPrice: string | number;
  maxPrice: string | number;
}

export interface FiltersContextValue {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  sort: SortOrder;
  setSort: Dispatch<SetStateAction<SortOrder>>;
}
