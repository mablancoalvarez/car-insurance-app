import ProductDetail from './ProductDetail';
const ProductList = ({ products }) => {
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
