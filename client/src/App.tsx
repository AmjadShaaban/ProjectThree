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
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';
import { Roles } from './interfaces';
import Dashboard from './components/kitchen/Dashboard';
const App: FC<{}> = () => {
  console.log(Object.values(Roles));
  return (
    <AuthProvider>
      <MenuProvider>
        <OrderProvider>
          <Router>
            <Switch>
              <Route exact path='/login' component={Login} />
              {/* <PrivateRoute
                exact
                path='/'
                roles={Object.values(Roles)}
                redirectTo='/login'
                component={MainDashboard}
              /> */}
              <Route exact path='/' component={Dashboard} />
              <PrivateRoute
                roles={[Roles.MANAGER]}
                redirectTo='/login'
                exact
                path='/6est'
                component={BackOfficeDashboard}
              />
              <Route exact path='/reg' component={Register} />
            </Switch>
          </Router>
        </OrderProvider>
      </MenuProvider>
    </AuthProvider>
  );
};

export default App;
