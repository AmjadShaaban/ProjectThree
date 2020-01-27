import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuthState } from '../../contexts/auth';
import { Roles } from '../../interfaces';

interface PrivateRouteProps extends RouteProps {
  roles: Roles[];
  redirectTo: string;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({
  roles,
  redirectTo,
  ...routeProps
}) => {
  const { user } = useAuthState();
  console.log(user);
  if (user && (user.role === Roles.ADMIN || roles.includes(user.role))) {
    return <Route {...routeProps} />;
  }

  return (
    <Redirect
      to={{
        pathname: redirectTo,
        state: { from: routeProps.location }
      }}
    />
  );
};
export default PrivateRoute;
