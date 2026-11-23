import { formatNumber } from '../../utils/helpers';
const ProductDetail = ({ product }) => {
  const customStyle = product.final_price === 0 ? 'not-final-price' : '';

  return (
    <div className="product">
      <div className="product_details">
        <img src={product.logo} alt={product.name} />
        <p className="product_modality">{product.modality.name}</p>
      </div>
      <div className="product_features">
        <ul>
          {product.features.map((feature, index) => (
            <li key={index}>{feature.description}</li>
          ))}
        </ul>
      </div>
      <div className="product_grade">
        <div>
          <span>Tariff grade</span>
          <p>{product.grade.total}</p>
        </div>
        <div className="product_price">
          <div>
            <p>Price</p>
            <p className={`price ${customStyle}`}>
              {formatNumber(product.price)}
            </p>
          </div>
          {product.excess !== 0 && (
            <div>
              <p>Excess in Euro</p>
              <p className={customStyle}>{formatNumber(product.excess)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
