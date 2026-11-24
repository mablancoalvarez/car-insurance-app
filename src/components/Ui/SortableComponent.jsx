import { useFilterData } from '../../hooks/useFilterData.jsx';

const SortableComponent = () => {
  const { sort, setSort } = useFilterData();

  const handleSort = () => {
    setSort(sort === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="sort">
      <button onClick={handleSort}>
        <span>Order by price</span>
        <span>{sort === 'asc' ? 'Ascendent ▲' : 'Descendent ▼'}</span>
      </button>
    </div>
  );
};

export default SortableComponent;
