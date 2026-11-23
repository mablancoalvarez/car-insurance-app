import { useFetchData } from './hooks/useFetchData';
import Filters from './screens/UserCustomSearch/Filters.jsx';
import './App.css';
import MainContent from './screens/UserCustomSearch/MainContent.jsx';

function App() {
  const { data: products } = useFetchData('/db.json');

  if (!products) return 'Loading';
  return (
    <div className="container">
      <Filters />
      <MainContent products={products} />
    </div>
  );
}

export default App;
