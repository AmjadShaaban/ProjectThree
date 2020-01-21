import React,{useState} from 'react';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';
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
              {isLoading && <CircularProgress />}
         <Title>Welcome</Title>
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