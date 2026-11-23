export const formatNumber = (number) => {
  return new Intl.NumberFormat('es', {
    style: 'currency',
    currency: 'EUR',
  }).format(number / 100);
};

export const sortProductsByPrice = (products, sort) => {
  return products?.sort((a, b) => {
    if (sort === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });
};
