import ProductDetail from './ProductDetail';
const ProductList = ({ products }) => {
  return products.map((product) => (
    <ul key={product.id}>
      <li className="product-detail">
        <ProductDetail product={product} />
      </li>
    </ul>
  ));
};

export default ProductList;
