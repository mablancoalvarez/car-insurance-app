import { useId, type ChangeEvent } from 'react';
import { useFilterData } from '../../hooks/useFilterData';
import Switch from '../../components/Ui/Switch';
import { INITIAL_FILTERS } from '../../context/DataContext';
import type { ModalityFilter } from '../../types';

const isModality = (value: string): value is ModalityFilter =>
  value === 'all' || value === 'with-excess' || value === 'without-excess';

const Filters = () => {
  const { filters, setFilters } = useFilterData();

  const idMinPrice = useId();
  const idMaxPrice = useId();
  const idFinalPrice = useId();
  const idModality = useId();

  const handleFilter = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFilters((prevState) => {
      if (name === 'finalPrice') {
        const checked =
          event.target instanceof HTMLInputElement
            ? event.target.checked
            : false;
        return { ...prevState, finalPrice: checked ? 1 : 0 };
      }
      if (name === 'modality' && isModality(value)) {
        return { ...prevState, modality: value };
      }
      if (name === 'minPrice') {
        return { ...prevState, minPrice: value };
      }
      if (name === 'maxPrice') {
        return { ...prevState, maxPrice: value };
      }
      return prevState;
    });
  };

  const onClearFilters = () => {
    setFilters({ ...INITIAL_FILTERS });
  };

  return (
    <aside className="filters">
      <h3 className="filters-title">Filtros</h3>
      <p className="filters-desc">Acotan lo que lee el asistente</p>
      <div className="filters-container">
        <div className="filters-final-price">
          <p className="filters-final-price-title">Precio final</p>
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
            Modalidad
          </label>
          <select
            value={filters.modality}
            name="modality"
            id={idModality}
            onChange={handleFilter}
          >
            <option value="all">Todas</option>
            <option value="with-excess">Con franquicia</option>
            <option value="without-excess">Sin franquicia</option>
          </select>
        </div>
        <div className="filters-price">
          <p className="filters-price-title">Precio</p>
          <div className="filters-price-container">
            <div>
              <label htmlFor={idMinPrice} className="minPrice">
                Mínimo
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
                Máximo
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
        Limpiar filtros
      </button>
    </aside>
  );
};

export default Filters;
