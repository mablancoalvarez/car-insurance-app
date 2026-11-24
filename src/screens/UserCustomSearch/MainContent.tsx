import { useFilterData } from '../../hooks/useFilterData';
import ProductsList from './ProductsList';
import SortableComponent from '../../components/Ui/SortableComponent';
import { sortProductsByPrice } from '../../utils/helpers';
import ComparisonTariff from './ComparisonTariff/index';
import { MIN_PRODUCT_TO_COMPARE } from '../../utils/constants';
import type { Product } from '../../types';

const MainContent = ({ products }: { products: Product[] }) => {
  const { filterProducts, sort } = useFilterData();
  const productsFiltered = filterProducts(products);
  const productsSorted = sortProductsByPrice(productsFiltered, sort);
  return (
    <main>
      <SortableComponent />
      <ProductsList products={productsSorted} />
      {productsFiltered.length >= MIN_PRODUCT_TO_COMPARE && (
        <ComparisonTariff products={productsFiltered} />
      )}
    </main>
  );
};

export default MainContent;
