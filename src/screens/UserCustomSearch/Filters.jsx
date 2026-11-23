import { useId } from 'react';
import { useFilterData } from '../../hooks/useFilterData.jsx';
import Switch from '../../components/Ui/Switch.jsx';
import { INITIAL_FILTERS } from '../../context/DataContext.jsx';

const Filters = () => {
  const { filters, setFilters } = useFilterData();

  const idMinPrice = useId();
  const idMaxPrice = useId();
  const idFinalPrice = useId();
  const idModality = useId();

  const handleFilter = (event) => {
    const { name, type, value, checked } = event.target;
    const nextValue = type === 'checkbox' ? (checked ? 1 : 0) : value;

    setFilters((prevState) => ({
      ...prevState,
      [name]: nextValue,
    }));
  };

  const onClearFilters = () => {
    setFilters({ ...INITIAL_FILTERS });
  };

  return (
    <aside className="filters">
      <h3 className="filters-title">Filters</h3>
      <p className="filters-desc">Customize your search</p>
      <div className="filters-container">
        <div className="filters-final-price">
          <p className="filters-final-price-title"> Has final price</p>
          <Switch
            id={idFinalPrice}
            name="finalPrice"
            type="checkbox"
            onChange={handleFilter}
            value={filters.finalPrice}
            checked={filters.finalPrice === 1}
          />
        </div>

        <div className="filters-modality">
          <label className="filters-modality-title" htmlFor={idModality}>
            MODALITY
          </label>
          <select
            value={filters.modality}
            name="modality"
            id={idModality}
            onChange={handleFilter}
          >
            <option value="all">--Please choose an option--</option>
            <option value="with-excess">With excess</option>
            <option value="without-excess">Without excess</option>
          </select>
        </div>
        <div className="filters-price">
          <p className="filters-price-title">PRICE</p>
          <div className="filters-price-container">
            <div>
              <label htmlFor={idMinPrice} className="minPrice">
                Minimum Price
              </label>
              <input
                id={idMinPrice}
                name="minPrice"
                type="number"
                value={filters.minPrice}
                onChange={handleFilter}
              />
            </div>
            <div>
              <label htmlFor={idMaxPrice} className="maxPrice">
                Maximum Price
              </label>
              <input
                id={idMaxPrice}
                name="maxPrice"
                type="number"
                value={filters.maxPrice}
                onChange={handleFilter}
              />
            </div>
          </div>
        </div>
      </div>

      <button className="clear-filters" onClick={onClearFilters}>
        Clear Filters
      </button>
    </aside>
  );
};

export default Filters;
