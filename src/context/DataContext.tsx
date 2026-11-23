import { createContext, useState, type ReactNode } from 'react';
import type { Filters, FiltersContextValue, SortOrder } from '../types';

export const INITIAL_FILTERS: Filters = {
  finalPrice: 1,
  modality: 'all',
  minPrice: '',
  maxPrice: '',
};

export const FiltersContext = createContext<FiltersContextValue | null>(null);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [sort, setSort] = useState<SortOrder>('asc');

  return (
    <FiltersContext.Provider value={{ filters, setFilters, sort, setSort }}>
      {children}
    </FiltersContext.Provider>
  );
};
