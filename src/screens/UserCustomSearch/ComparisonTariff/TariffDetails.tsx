import { formatNumber } from '../../../utils/helpers';
import type { Product } from '../../../types';

const TariffDetails = ({ tariff }: { tariff: Partial<Product> | null }) => {
  if (!tariff) return null;
  const { price, modality, excess, company, features } = tariff;

  return (
    <div className="tariff">
      <img src={tariff.logo} alt={company} />
      {price ? (
        <p className="tariff__price">
          Price: <span>{formatNumber(price)}</span>
        </p>
      ) : null}
      {modality ? (
        <p className="tariff__modality">Modality: {modality.name}</p>
      ) : null}
      {(excess ?? 0) > 0 ? (
        <p className="tariff__excess">Excess: {formatNumber(excess ?? 0)}</p>
      ) : null}
      <ul className="tariff__features">
        {features?.map((feature) => (
          <li key={feature.description}>{feature.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default TariffDetails;
