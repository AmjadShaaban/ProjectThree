import React, { FC } from 'react';
import './App.css';
import { AuthProvider } from './contexts/auth';
import { MenuProvider } from './contexts/menu';
import { OrderProvider } from './contexts/order';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/auth/Register';
import MainDashboard from './components/front/FrontDashboard';
import BackOfficeDashboard from './components/office/OfficeDashboard';
import './fonts/minisystem.ttf';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';
import { Roles } from './interfaces';
import Dashboard from './components/kitchen/KitchenDashboard';
import { createMuiTheme } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors/index';
import { SnackbarProvider } from 'notistack';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';

const App: FC<{}> = () => {
  const theme = createMuiTheme({
    palette: {
      primary: colors.grey,
      secondary: colors.blueGrey,
      success: colors.lime,
      error: colors.red,
      warning: colors.deepOrange,
      info: colors.pink,
      type: 'dark'
    }
  });
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={5}>
          <AuthProvider>
            <MenuProvider>
              <OrderProvider>
                <Router>
                  <Switch>
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <PrivateRoute
                      exact
                      path='/'
                      roles={Object.values(Roles)}
                      redirectTo='/login'
                      component={MainDashboard}
                    />
                    <PrivateRoute
                      exact
                      path='/kitchen'
                      roles={[Roles.MANAGER, Roles.COOK, Roles.EMPLOYEE]}
                      redirectTo='/login'
                      component={Dashboard}
                    />
                    <PrivateRoute
                      exact
                      path='/office'
                      roles={[Roles.MANAGER]}
                      redirectTo='/login'
                      component={BackOfficeDashboard}
                    />
                  </Switch>
                </Router>
              </OrderProvider>
            </MenuProvider>
          </AuthProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default App;
