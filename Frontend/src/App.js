import { Outlet } from 'react-router-dom';
import './App.css';
import AppRoutes from './AppRoute';
import HeroSection from './Header';
import NavBar from './Navbar';
import Header from './Header';

function App() {
  return (
    <div className="App">
      {/* <HeroSection/> */}
      <Header/>
      <AppRoutes/>
    </div>
  );
}

export default App;
