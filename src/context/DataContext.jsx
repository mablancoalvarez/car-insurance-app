import { createContext, useState } from 'react';

export const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    finalPrice: 1,
    modality: 'all',
    minPrice: '',
    maxPrice: '',
  });
  const [sort, setSort] = useState('asc');

  return (
    <FiltersContext.Provider value={{ filters, setFilters, sort, setSort }}>
      {children}
    </FiltersContext.Provider>
  );
};
