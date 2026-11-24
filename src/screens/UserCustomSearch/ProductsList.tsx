import ProductDetail from './ProductDetail';
import type { Product } from '../../types';

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id} className="product-detail">
          <ProductDetail product={product} />
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
