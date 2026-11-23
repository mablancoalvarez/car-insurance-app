import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { FiltersProvider } from './context/DataContext';

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element #root not found');
}

ReactDOM.createRoot(root).render(
  <FiltersProvider>
    <App />
  </FiltersProvider>
);
