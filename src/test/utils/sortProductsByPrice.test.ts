import { sortProductsByPrice } from '../../utils/helpers';

describe('sort', () => {
  const products = [
    { id: 'MAPFRE', price: 10000 },
    { id: 'AXA', price: 5200000 },
    { id: 'ZURICH', price: 150 },
  ];

  it('should sort ascending', () => {
    const sortedProducts = sortProductsByPrice(products, 'asc');
    expect(sortedProducts).toEqual([
      { id: 'ZURICH', price: 150 },
      { id: 'MAPFRE', price: 10000 },
      { id: 'AXA', price: 5200000 },
    ]);
  });

  it('should sort descending', () => {
    const sortedProducts = sortProductsByPrice(products, 'desc');
    expect(sortedProducts).toEqual([
      { id: 'AXA', price: 5200000 },
      { id: 'MAPFRE', price: 10000 },
      { id: 'ZURICH', price: 150 },
    ]);
  });
});
