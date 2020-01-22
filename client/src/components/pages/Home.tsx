import React from 'react'
import {useAuthState} from '../../contexts/auth'
import CircularProgress from '@material-ui/core/CircularProgress';
import Dashboard from '../dashboard/Dashboard';
import Register from '../auth/Register'
import Login from '../auth/Login'


const Home: React.FC=()=>{
    const {isAuthenticated,isLoading}= useAuthState();
    return(
        <>
        {isLoading && <CircularProgress />}
        {/* {isAuthenticated?<Dashboard />:<Login />} */}
        <Dashboard/>
        </>
              

    )
}

export default Home;