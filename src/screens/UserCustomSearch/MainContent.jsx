import { useFilterData } from '../../hooks/useFilterData.jsx';
import ProductsList from './ProductsList.jsx';
import SortableComponent from '../../components/Ui/SortableComponent.jsx';
import { sortProductsByPrice } from '../../utils/helpers.js';
import ComparisonTariff from './ComparisonTariff/index.jsx';
import { MIN_PRODUCT_TO_COMPARE } from '../../utils/constants.js';

const MainContent = ({ products }) => {
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
