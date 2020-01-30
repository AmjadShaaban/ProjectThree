import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const Copyright: FC = () => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://ps-pos.herokuapp.com'>
        Project PoS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};
export default Copyright;
