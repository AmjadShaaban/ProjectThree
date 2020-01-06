import React from 'react';
import './App.css';
import Menu from './components/Dashboard/Menu';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import { AuthProvider } from './contexts/auth';
import { MenuProvider } from './contexts/menu';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MenuProvider>
        {/* <Register /> */}
        {/* <Login /> */}
        {/* <Dashboard /> */}
        <Menu />
      </MenuProvider>
    </AuthProvider>
  );
};

export default App;
