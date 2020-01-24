import React from 'react';
import './App.css';
import { AuthProvider } from './contexts/auth';
import { MenuProvider } from './contexts/menu';
import { OrderProvider } from './contexts/order'
import Dashboard from './components/dashboard/Dashboard'
import './fonts/minisystem.ttf'

// import PlayGround from './components/dashboard/PlayGround';
const App: React.FC = () => {
  return (
    <AuthProvider>
      <MenuProvider><OrderProvider>
        {/* <PlayGround/> */}
        <Dashboard/>
        </OrderProvider>
      </MenuProvider>
    </AuthProvider>
  );
};

export default App;
