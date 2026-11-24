import { useState } from 'react';
import { diffTariffs } from './helpers';
import TariffDetails from './TariffDetails';
import Switch from '../../../components/Ui/Switch';

const ComparisonTariff = ({ products }) => {
  const [showDifferences, setShowDifferences] = useState(false);

  if (!products || products.length < 2) return null;

  const [tariff1, tariff2] = products;
  const [differencesTariff1, differencesTariff2] = diffTariffs(
    tariff1,
    tariff2
  );
  const resultTariff1 = showDifferences ? differencesTariff1 : tariff1;
  const resultTariff2 = showDifferences ? differencesTariff2 : tariff2;

  return (
    <div className="comparison">
      <div className="comparison-tariffs-action">
        <Switch
          onChange={() => setShowDifferences((current) => !current)}
          id="checkbox"
          name="differences"
          checked={showDifferences}
        />
        <label className="comparison-tariffs-action-label" htmlFor="checkbox">
          Show only differences
        </label>
      </div>
      <div className="comparison-tariffs">
        <TariffDetails tariff={resultTariff1} />
        <TariffDetails tariff={resultTariff2} />
      </div>
    </div>
  );
};

export default ComparisonTariff;
