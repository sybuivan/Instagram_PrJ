import './App.css';
import { useRoutes } from 'react-router-dom';
import './assets/css/reset.module.css';
import './assets/css/_variable.css';
import { routes } from './configs';
import { useSelector } from 'react-redux';

function App() {
  const isLogin = useSelector((state) => state.auth.current);

  return useRoutes(routes(isLogin));
}

export default App;
