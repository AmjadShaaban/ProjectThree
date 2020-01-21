import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../shared/Title';
import { useAuthState } from '../../contexts/auth';

const useStyles = makeStyles({
  depositContext: {
    flex: 1
  }
});

export default function Deposits() {
  const { user } = useAuthState();
  const classes = useStyles();
  return (
    <>
      <Title>Welcome</Title>
      <Typography component='p' variant='h4'>
        {user && user.fName}
      </Typography>
      <div>
      </div>
    </>
  );
}
