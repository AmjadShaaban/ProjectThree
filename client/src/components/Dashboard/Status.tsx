import React from 'react';
import { useAuthState } from '../../contexts/auth';
import CircularProgress from '@material-ui/core/CircularProgress';
import EmployeeLogin from '../../components/auth/EmployeeLogin';

export default function Status(){
  const authState = useAuthState();
  const { user, token, isLoading, isAuthenticated } = authState;

  return (
    <>
      {isLoading && <CircularProgress />}
      <div>
        {isAuthenticated ? (
          <>
            <div>Welcome {user?.fullName}</div>
            <div>
              Access level: {user?.role === 'UNKNOWN' ? 'Demo' : user?.role}
            </div>
            <div>{JSON.stringify({ user, token })}</div>
          </>
        ) : (
          <EmployeeLogin />
        )}
      </div>
    </>
  );
};
