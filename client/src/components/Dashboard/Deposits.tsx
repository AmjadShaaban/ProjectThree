import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { useAuthState } from '../../contexts/auth';

function preventDefault(event: Event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1
  }
});

export default function Deposits() {
  const { user } = useAuthState();
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Welcome</Title>
      <Typography component='p' variant='h4'>
        {user && user.fName}
      </Typography>
      <Typography color='textSecondary' className={classes.depositContext}>
        {user.admin ? 'You are Admin' : 'You are NOT Admin'}
      </Typography>
      <div>
        <Link color='primary' href='#'>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
