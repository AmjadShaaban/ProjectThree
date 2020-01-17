import React,{ useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useMenuDispatch, useMenuState, loadMenu } from '../../contexts/menu';

const ITEM_HEIGHT = 48;

export default function PlayGround() {
    const {menu,isMenuLoading}=useMenuState();
    const dispatch = useMenuDispatch();
    useEffect(()=>{
        loadMenu(dispatch);
    },[dispatch])
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label='more'
        aria-controls='menu-categories'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='menu-categories'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200
          }
        }}
      >
        {menu.map(option => (
          <MenuItem
            key={option._id}
            selected={option.name === 'Test'}
            onClick={handleClose}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

// const getMenuOptions = async ()=>{
//     try {
//         const categories = await Axios.get('/api/menu')
//         if(categories){
//             const options = categories.map()
//         }

//     } catch (error) {

//     }
// }
