import { useFetchData } from './hooks/useFetchData';
import { useFilterData } from './hooks/useFilterData';
import Filters from './screens/UserCustomSearch/Filters';
import './App.css';
import MainContent from './screens/UserCustomSearch/MainContent';
import TariffAssistant from './components/Assistant/TariffAssistant';
import type { Product } from './types';

function App() {
  const { data: products, error } = useFetchData<Product[]>('/db.json');
  const { filterProducts } = useFilterData();

  if (error) return <p>{error}</p>;
  if (!products) return <p className="ai-loading">Leyendo tarifas</p>;

  const visible = filterProducts(products);

  return (
    <div className="ai-shell">
      <div className="ai-atmosphere" aria-hidden="true" />
      <header className="ai-top">
        <p className="ai-mark">Cobertura</p>
        <p>Asistente de tarifas</p>
      </header>
      <TariffAssistant products={visible} />
      <div className="container ai-stage">
        <Filters />
        <MainContent products={products} />
      </div>
    </div>
  );
}

export default App;
