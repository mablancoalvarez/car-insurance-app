import { createContext, useState } from 'react';

export const INITIAL_FILTERS = {
  finalPrice: 1,
  modality: 'all',
  minPrice: '',
  maxPrice: '',
};

export const FiltersContext = createContext(null);

export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [sort, setSort] = useState('asc');

  return (
    <FiltersContext.Provider value={{ filters, setFilters, sort, setSort }}>
      {children}
    </FiltersContext.Provider>
  );
};
