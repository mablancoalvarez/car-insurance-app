import { useState } from 'react';
import { compareObjects, compareProperty } from './helpers';
import TariffDetails from './TariffDetails';
import Switch from '../../../components/Ui/Switch';

const ComparisonTariff = ({ products }) => {
  if (!products || products.length < 0) return null;
  const [showDifferences, setShowDifferences] = useState(false);

  const tariff1 = products[0];
  const tariff2 = products[1];

  const handleCheckboxClick = () => {
    setShowDifferences(!showDifferences);
  };
  const getDifferences = (obj1, obj2) => {
    const differences1 = { ...obj1 };
    const differences2 = { ...obj2 };

    compareObjects(obj1, obj2, differences1, differences2);
    compareProperty('modality', obj1, obj2, differences1, differences2);
    compareProperty('features', obj1, obj2, differences1, differences2);

    return [differences1, differences2];
  };

  const [differencesTariff1, differencesTariff2] = getDifferences(
    tariff1,
    tariff2
  );
  const resultTariff1 = showDifferences ? differencesTariff1 : tariff1;
  const resultTariff2 = showDifferences ? differencesTariff2 : tariff2;
  console.log('--->', resultTariff1, resultTariff2);
  console.log('showDifferences', showDifferences);
  return (
    <div className="comparison">
      <div className="comparison-tariffs-action">
        <Switch
          onChange={handleCheckboxClick}
          id="checkbox"
          name="differences"
        />
        <label className="comparison-tariffs-action-label">
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
