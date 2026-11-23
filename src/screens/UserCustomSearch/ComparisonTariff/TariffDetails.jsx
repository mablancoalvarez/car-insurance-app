import { formatNumber } from '../../../utils/helpers';
const TariffDetails = ({ tariff }) => {
  if (!tariff) return null;
  const { price, modality, excess, company, features } = tariff;

  return (
    <div className="tariff">
      <img src={tariff.logo} alt={company} />
      {price && (
        <p className="tariff__price">
          Price: <span>{formatNumber(price)}</span>
        </p>
      )}
      {modality && (
        <p className="tariff__modality">Modality: {modality?.name}</p>
      )}
      {excess > 0 && (
        <p className="tariff__excess">Excess: {formatNumber(excess)}</p>
      )}
      <ul className="tariff__features">
        {features?.map((feature) => (
          <li key={feature.description}>{feature.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default TariffDetails;
