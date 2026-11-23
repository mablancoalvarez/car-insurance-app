import { useFetchData } from './hooks/useFetchData';
import Filters from './screens/UserCustomSearch/Filters';
import './App.css';
import MainContent from './screens/UserCustomSearch/MainContent';
import type { Product } from './types';

function App() {
  const { data: products, error } = useFetchData<Product[]>('/db.json');

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
