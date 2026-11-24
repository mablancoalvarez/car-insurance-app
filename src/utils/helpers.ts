import type { SortOrder } from '../types';

export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat('es', {
    style: 'currency',
    currency: 'EUR',
  }).format(number / 100);
};

export const sortProductsByPrice = <T extends { price: number }>(
  products: readonly T[] | null | undefined,
  sort: SortOrder
): T[] => {
  return [...(products ?? [])].sort((a, b) =>
    sort === 'asc' ? a.price - b.price : b.price - a.price
  );
};
