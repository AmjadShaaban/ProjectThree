import React, { FC } from 'react';
import './App.css';
import { AuthProvider } from './contexts/auth';
import { MenuProvider } from './contexts/menu';
import { OrderProvider } from './contexts/order';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/auth/Register';
import MainDashboard from './components/front/MainDashboard';
import BackOfficeDashboard from './components/backOffice/BackOfficeDashboard';
import './fonts/minisystem.ttf';
import Dashboard from './components/shared/Dashboard';
const App: FC<{}> = () => {
  return (
    <AuthProvider>
      <MenuProvider>
        <OrderProvider>
          <Router>
            <Switch>
              <Route exact path='/logout' component={Dashboard} />
              <Route exact path='/' component={MainDashboard} />
              <Route exact path='/6est' component={BackOfficeDashboard} />
              <Route exact path='/reg' component={Register} />
            </Switch>
          </Router>
          {/* <PlayGround/> */}
          {/* <BackOfficeDashboard /> */}
          {/* <MainDashboard /> */}
        </OrderProvider>
      </MenuProvider>
    </AuthProvider>
  );
};

export default App;
