import React from 'react';
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
import { MainListItems, SecondaryListItems } from '../front/listItems';
import { Roles } from '../../interfaces';

const fakeData = [
  {
    _id: '5e2dec893a90a54afc1c27ff',
    orderItems: [
      '5e2d86749eb4c63a139fa819',
      '5e2d86749eb4c63a139fa819',
      '5e2d86749eb4c63a139fa819',
      '5e2d86749eb4c63a139fa819',
      '5e2d86749eb4c63a139fa819'
    ],
    customerName: 'Amjad',
    customerPhone: '555-555-5555',
    customerAddress: 'sdfd',
    type: 'Order-in',
    total: '42.5',
    createdAt: '2020-01-26T19:46:17.577Z',
    updatedAt: '2020-01-27T02:45:07.198Z',
    isOpen: false
  },
  {
    _id: '5e2dec893a90a54afc1c27ff',
    orderItems: [
      '5e2d86749eb4c63a139fa819',
      '5e2d86749eb4c63a139fa819',
      '5e2d86749eb4c63a139fa819',
      '5e2d86749eb4c63a139fa819',
      '5e2d86749eb4c63a139fa819'
    ],
    customerName: 'Amjad',
    customerPhone: '555-555-5555',
    customerAddress: 'sdfd',
    type: 'Order-in',
    total: '42.5',
    createdAt: '2020-01-26T19:46:17.577Z',
    updatedAt: '2020-01-27T02:45:07.198Z',
    __v: 0,
    isOpen: false
  },
  {
    _id: '5e2dec893a90a54afc1c27ff',
    orderItems: [
      '5e2d86749eb4c63a139fa819',
      '5e2d86749eb4c63a139fa819',
      '5e2d86749eb4c63a139fa819',
      '5e2d86749eb4c63a139fa819',
      '5e2d86749eb4c63a139fa819'
    ],
    customerName: 'Amjad',
    customerPhone: '555-555-5555',
    customerAddress: 'sdfd',
    type: 'Order-in',
    total: '42.5',
    createdAt: '2020-01-26T19:46:17.577Z',
    updatedAt: '2020-01-27T02:45:07.198Z',
    isOpen: false
  }
];

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
  //   const dispatch = useMenuDispatch();
  //   useEffect(() => {
  //     loadMenu(dispatch);
  //   }, [dispatch]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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
            <Badge badgeContent={4} color='secondary'>
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
          <MainListItems role={Roles.COOK} />
        </List>
        <Divider />
        <List>
          <SecondaryListItems role={Roles.COOK} />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Paper className={fixedHeightPaper}>
                <Title>Order: {fakeData[0]._id}</Title>
                <svg viewBox='0 0 300 500'>
                  <rect height='100%' width='100%' fill='blue' />
                  <rect
                    x='5%'
                    y='3%'
                    height='94%'
                    width='90%'
                    stroke='gray'
                    strokeWidth='2'
                    fill='blue'
                  />
                  <text x='8%' y='7%' fill='gray'>
                    {fakeData[0].createdAt}
                  </text>
                  <text x='11%' y='11%' fill='gray'>
                    {fakeData[0].orderItems[0]}
                  </text>
                  <text x='11%' y='14%' fill='gray'>
                    {fakeData[0].orderItems[1]}
                  </text>
                  <text x='11%' y='17%' fill='gray'>
                    {fakeData[0].orderItems[2]}
                  </text>
                  <text x='11%' y='20%' fill='gray'>
                    {fakeData[0].orderItems[3]}
                  </text>
                  <text x='11%' y='26%' fill='gray'>
                    {fakeData[0].orderItems[3]}
                  </text>
                  <text x='8%' y='32%' fill='gray'>
                    {fakeData[0].total}
                  </text>
                  <text x='11%' y='35%' fill='gray'>
                    {fakeData[0].total}
                  </text>
                  <text x='11%' y='38%' fill='gray'>
                    {fakeData[0].total}
                  </text>
                  <text x='11%' y='41%' fill='gray'>
                    {fakeData[0].total}
                  </text>
                  <text x='11%' y='44%' fill='gray'>
                    {fakeData[0].total}
                  </text>
                  <text x='11%' y='47%' fill='gray'>
                    {fakeData[0].total}
                  </text>
                  <text x='11%' y='50%' fill='gray'>
                    {fakeData[0].orderItems[0]}
                  </text>
                  <text x='11%' y='53%' fill='gray'>
                    {fakeData[0].orderItems[1]}
                  </text>
                  <text x='11%' y='56%' fill='gray'>
                    {fakeData[0].orderItems[2]}
                  </text>
                  <text x='11%' y='59%' fill='gray'>
                    {fakeData[0].orderItems[3]}
                  </text>
                  <text x='11%' y='62%' fill='gray'>
                    {fakeData[0].createdAt}
                  </text>
                  <text x='11%' y='65%%' fill='gray'>
                    {fakeData[0].orderItems[3]}
                  </text>
                  <text x='8%' y='68%' fill='gray'>
                    {fakeData[0].total}
                  </text>
                  <text x='11%' y='71%' fill='gray'>
                    {fakeData[0].total}
                  </text>
                  <text x='11%' y='74%' fill='gray'>
                    {fakeData[0].total}
                  </text>
                  <text x='11%' y='77%' fill='gray'>
                    {fakeData[0].total}
                  </text>
                  <text x='11%' y='80%' fill='gray'>
                    {fakeData[0].total}
                  </text>
                  <text x='11%' y='83%' fill='gray'>
                    {fakeData[0].total}
                  </text>
                  <text x='11%' y='86%' fill='gray'>
                    {fakeData[0].total}
                  </text>
                  <text x='11%' y='89%' fill='gray'>
                    {fakeData[0].total}
                  </text>
                  <text x='11%' y='92%' fill='gray'>
                    {fakeData[0].total}
                  </text>
                  <text x='11%' y='95%' fill='gray'>
                    {fakeData[0].total}
                  </text>
                  inline SVG Not Supported.
                </svg>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={fixedHeightPaper}>{`im shit here`}</Paper>
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
