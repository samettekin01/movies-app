import { Outlet } from 'react-router-dom';
import './App.css';
import NavBar from './components/common/NavBar/NavBar';
import Github from './assets/Github';
import Fouter from './components/common/Fouter/Fouter';

function App() {

  return (
    <div className="App flex flex-col w-full">
      <Github />
      <NavBar />
      <Outlet />
      <Fouter />
    </div>
  );
}

export default App;
