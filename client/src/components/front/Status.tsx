import React from 'react';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import { useAuthState, logoutUser, useAuthDispatch } from '../../contexts/auth';
import CircularProgress from '@material-ui/core/CircularProgress';
import EmployeeLogin from '../auth/EmployeeLogin';
import Title from '../shared/Title';
import NewOrder from '../order/NewOrder';

export default function Status() {
  const authState = useAuthState();
  const authDispatch = useAuthDispatch();
  const { user, isLoading, token } = authState;
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      {isLoading && <CircularProgress />}
      <div>
        {token ? (
          <>
            <Title>Welcome {user?.fullName}</Title>{' '}
            {!!token && (
              <Button
                color='primary'
                variant='contained'
                onClick={e => {
                  logoutUser(authDispatch);
                }}
              >
                Logout
              </Button>
            )}
            <Button
              color='primary'
              variant='contained'
              onClick={() => enqueueSnackbar('Im clicked!')}
            >
              Test snack
            </Button>
            <div>
              Access level: {user?.role === 'UNKNOWN' ? 'Demo' : user?.role}
            </div>
            <NewOrder />
          </>
        ) : (
          <EmployeeLogin />
        )}
      </div>
    </>
  );
}
