import './App.css';
import { useRoutes } from 'react-router-dom';
import { routes } from './constants';
import './assets/css/reset.module.css';
import './assets/css/_variable.css';

function App() {
  return useRoutes(routes);
}

export default App;
