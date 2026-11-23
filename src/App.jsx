import { useFetchData } from './hooks/useFetchData';
import Filters from './screens/UserCustomSearch/Filters.jsx';
import './App.css';
import MainContent from './screens/UserCustomSearch/MainContent.jsx';

function App() {
  const { data: products, error } = useFetchData('/db.json');

  if (error) return <p>{error}</p>;
  if (!products) return <p>Loading</p>;
  return (
    <div className="container">
      <Filters />
      <MainContent products={products} />
    </div>
  );
}

export default App;
