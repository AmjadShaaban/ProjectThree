import React from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import { AuthProvider } from './contexts/auth';
import { MenuProvider } from './contexts/menu';
import Register from './components/auth/Register'
const App: React.FC = () => {
  return (
    <AuthProvider>
      <MenuProvider>
        <Register/>
        {/* <Dashboard /> */}
      </MenuProvider>
    </AuthProvider>
  );
};

export default App;
