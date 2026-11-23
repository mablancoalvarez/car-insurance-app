export const formatNumber = (number) => {
  return new Intl.NumberFormat('es', {
    style: 'currency',
    currency: 'EUR',
  }).format(number / 100);
};

export const sortProductsByPrice = (products, sort) => {
  return [...(products ?? [])].sort((a, b) =>
    sort === 'asc' ? a.price - b.price : b.price - a.price
  );
};
