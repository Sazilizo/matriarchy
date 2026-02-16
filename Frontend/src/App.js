import { Outlet } from 'react-router-dom';
import './App.css';
import AppRoutes from './AppRoute';

function App() {
  return (
    <div className="App">
      <AppRoutes/>
      <Outlet/>
    </div>
  );
}

export default App;
