import React,{useState} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../shared/Title';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useAuthState, useAuthDispatch, loginUser } from '../../contexts/auth';

  const useStyles = makeStyles(theme => ({
    loginContext: {
        flex: 1
      },
            
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
      }
    }));

export default function EmployeeLogin(){
    const classes = useStyles();
    const authState = useAuthState();
    const [email, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const authDispatch = useAuthDispatch();
    const {user,isLoading}= authState;

    return(
        <>
         <Title>Welcome</Title>
         <Typography component='p' variant='h4'>
        {user && user.fName}
      </Typography>
      <Typography color='textSecondary' className={classes.loginContext}>
        {user.employee ? 'You are Employee' : 'You are NOT Employee'}
        </Typography>
        <Typography color='textSecondary' className={classes.loginContext}>
        {user.driver ? 'You are Driver' : 'You are NOT Driver'}
    </Typography>
    <Typography color='textSecondary' className={classes.loginContext}>
        {user.manager ? 'You are Manager' : 'You are NOT Manager'}
    </Typography>
      <Typography color='textSecondary' className={classes.loginContext}>
        {user.admin ? 'You are Admin' : 'You are NOT Admin'}
    </Typography>

         <form
            className={classes.form}
            noValidate
            onSubmit={e => {
              e.preventDefault();
              loginUser(authDispatch, { email, password });
            }}
          >
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              value={email}
              onChange={e => setUserEmail(e.target.value)}
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete='current-password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign In
            </Button>
            </form>
            </>


    )

}