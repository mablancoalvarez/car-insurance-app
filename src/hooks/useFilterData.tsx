import { useContext } from 'react';
import { FiltersContext } from '../context/DataContext';
import type { FilterableProduct } from '../types';

const toBound = (value: string | number): number | null => {
  if (value === '') return null;
  return Number(value);
};

export const useFilterData = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilterData must be used within FiltersProvider');
  }
  const { filters, setFilters, sort, setSort } = context;

  const filterProducts = <T extends FilterableProduct>(
    products: readonly T[] | null | undefined
  ): T[] => {
    if (!products) return [];
    return products.filter((product) => {
      const minBound = toBound(filters.minPrice);
      const maxBound = toBound(filters.maxPrice);
      const minPriceCondition =
        minBound === null || product.price / 100 >= minBound;
      const maxPriceCondition =
        maxBound === null || product.price / 100 <= maxBound;
      const finalPriceCondition =
        filters.finalPrice === 1
          ? product.final_price === 1
          : product.final_price === 0;
      const modalityCondition =
        filters.modality === 'all'
          ? true
          : filters.modality === 'with-excess'
            ? product.excess !== 0
            : product.excess === 0;

      return (
        minPriceCondition &&
        maxPriceCondition &&
        finalPriceCondition &&
        modalityCondition
      );
    });
  };

  return { filters, filterProducts, setFilters, sort, setSort };
};
