/**
 * @jest-environment jsdom
 */
import React from 'react';
import { renderHook } from '@testing-library/react';
import { FiltersContext } from '../../context/DataContext';
import { useFilterData } from '../../hooks/useFilterData';

describe('useFilterData hook', () => {
  it('should filter products', () => {
    const mockedFilters = {
      filters: { minPrice: 0, finalPrice: 1, modality: 'all', maxPrice: 100 },
      setFilters: jest.fn(),
    };

    const { result } = renderHook(() => useFilterData(), {
      wrapper: ({ children }) => (
        <FiltersContext.Provider value={mockedFilters}>
          {children}
        </FiltersContext.Provider>
      ),
    });

    const { filterProducts } = result.current;

    const mockProducts = [
      { price: 15, final_price: 1, modality: 'Terceros basico', excess: 0 },
      { price: 20, final_price: 0, modality: 'Terceros basico', excess: 5 },
    ];

    const filteredProducts = filterProducts(mockProducts);

    expect(filteredProducts).toEqual([
      { price: 15, final_price: 1, modality: 'Terceros basico', excess: 0 },
    ]);
  });
});
