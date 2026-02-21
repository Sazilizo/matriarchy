import { Outlet } from 'react-router-dom';
import './App.css';
import AppRoutes from './AppRoute';
import HeroSection from './Header';

function App() {
  return (
    <div className="App">
      <HeroSection/>
      <AppRoutes/>
    </div>
  );
}

export default App;
