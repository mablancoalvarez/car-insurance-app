import { useState, useContext } from 'react';
import { FiltersContext } from '../../context/DataContext.jsx';

const SortableComponent = () => {
  const { sort, setSort } = useContext(FiltersContext);
  const [ascending, setAscending] = useState(true);

  const handleSort = () => {
    setAscending(!ascending);
    setSort(!ascending ? 'asc' : 'desc');
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
