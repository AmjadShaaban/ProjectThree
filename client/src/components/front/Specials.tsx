import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useMenuState } from '../../contexts/menu';
import Title from '../shared/Title';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)'
    },
    title: {
      color: theme.palette.primary.light
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
    }
  })
);

export default function SingleLineGridList() {
  const { menu } = useMenuState();

  const classes = useStyles();
  return (
    <>
      <Title>Specials</Title>
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={6}>
          {menu.map(category => (
            <GridListTile key={category._id}>
              <svg viewBox='0 0 120 120'>
                <rect height='100%' width='100%' fill='lightgray' />
                <text x='25' y='30' fill='red'>
                  {category.iconData.line1}
                </text>
                <text x='55' y='55' fill='red'>
                  {category.iconData.line2}
                </text>
                <text x='25' y='90' fill='red'>
                  {category.iconData.line3}
                </text>
                inline SVG Not Supported.
              </svg>
              <GridListTileBar
                title={`${category.name}`}
                classes={{
                  root: classes.titleBar,
                  title: classes.title
                }}
                actionIcon={
                  <IconButton aria-label={`star ${category.name}`}>
                    <StarBorderIcon className={classes.title} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </>
  );
}
