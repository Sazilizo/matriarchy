import { Outlet } from 'react-router-dom';
import './App.css';
import AppRoutes from './AppRoute';
import HeroSection from './Header';
import NavBar from './Navbar';

function App() {
  return (
    <div className="App">
      {/* <HeroSection/> */}
      <NavBar/>
      <AppRoutes/>
    </div>
  );
}

export default App;
