import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Title from '../shared/Title';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { MainListItems, SecondaryListItems } from '../shared/listItems';
import { Order, CategoryItem } from '../../interfaces';
import socketIOClient from 'socket.io-client';
import {
  useOrderState,
  useOrderDispatch,
  getOrders,
  completeOrder
} from '../../contexts/order';
import uuidv1 from 'uuid/v1';

const injectSVGText = (arr: Order['orderItems']) => {
  let x = 11;
  let y = 12;
  return arr.map((item: CategoryItem, i: number) => (
    <text x={`${x}%`} y={`${y + i * 5}%`} fill={`darkgray`} key={uuidv1()}>
      {`${item.name}`}
    </text>
  ));
};

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        PROJECT POS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const drawerWidth = 240;
const endPoint = 'https://p3-pos.herokuapp.com/';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  test: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  test2: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: 575
  },

  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 600
  }
}));

export default function Dashboard() {
  const { orders } = useOrderState();
  const orderDispatch = useOrderDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(() => {
    getOrders(orderDispatch, '?isOpen=t');
    const socket = socketIOClient(endPoint);
    socket.on('Orders changed', (data: boolean) => {
      console.log(data);
      getOrders(orderDispatch, '?isOpen=t');
    });

    return () => {
      socket.disconnect();
    };
  }, [orderDispatch]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='absolute'
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}
          >
            Project POS
          </Typography>
          <IconButton color='inherit'>
            <Badge badgeContent={4} color='error'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems />
        </List>
        <Divider />
        <List>
          <SecondaryListItems />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                <Title>Open orders:</Title>
                <Grid container spacing={1}>
                  {orders?.map((item, i) => (
                    <Grid item xs={3} key={uuidv1()}>
                      <svg viewBox='0 0 300 500'>
                        <rect height='100%' width='100%' fill='blue' />
                        <rect
                          x='5%'
                          y='3%'
                          height='94%'
                          width='90%'
                          stroke='darkgray'
                          strokeWidth='2'
                          fill='blue'
                        />
                        <text x='8%' y='7%' fill='darkgray'>
                          Order: ORDER_NUMBER_HERE
                        </text>
                        {injectSVGText(item.orderItems)}
                      </svg>
                      <div
                        onClick={() => {
                          !!item._id &&
                            completeOrder(
                              orderDispatch,
                              { isOpen: false },
                              item._id
                            );
                        }}
                      >
                        <svg viewBox='0 0 240 75'>
                          <rect height='100%' width='100%' fill='white' />
                          <rect
                            x='5%'
                            y='14%'
                            height='70%'
                            width='90%'
                            stroke='green'
                            strokeWidth='4'
                            fill='lime'
                          />
                          <text x='24%' y='53%' fill='primary' stroke='green'>
                            ✔︎ Complete Order
                          </text>
                        </svg>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
