import { useContext } from 'react';
import { FiltersContext } from '../context/DataContext';

export const useFilterData = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilterData must be used within FiltersProvider');
  }
  const { filters, setFilters, sort, setSort } = context;

  const filterProducts = (products) => {
    return products?.filter((product) => {
      const minPriceCondition =
        filters.minPrice === '' || product.price / 100 >= filters.minPrice;
      const maxPriceCondition =
        filters.maxPrice === '' || product.price / 100 <= filters.maxPrice;
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
