import { useEffect } from 'react';
import { useAuthState } from '../../contexts/auth';
import { useSnackbar } from 'notistack';

const AuthErrorCatcher = () => {
  const { error } = useAuthState();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error);
    }
  }, [enqueueSnackbar, error]);

  return null;
};

export default AuthErrorCatcher;
