import { useFilterData } from '../../hooks/useFilterData';

const SortableComponent = () => {
  const { sort, setSort } = useFilterData();

  const handleSort = () => {
    setSort(sort === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="sort">
      <button onClick={handleSort}>
        <span>Ordenar por precio</span>
        <span>{sort === 'asc' ? 'Ascendente ▲' : 'Descendente ▼'}</span>
      </button>
    </div>
  );
};

export default SortableComponent;
