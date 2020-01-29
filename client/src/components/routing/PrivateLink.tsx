import React, { FC } from 'react';
import Link, { LinkProps } from '@material-ui/core/Link';

// import Link,{ LinkProps } from 'react-router-dom';

import { useAuthState } from '../../contexts/auth';
import { Roles } from '../../interfaces';

interface PrivateLinkProps extends LinkProps {
  roles: Roles[];
}

export const PrivateLink: FC<PrivateLinkProps> = ({ roles, ...linkProps }) => {
  const { user } = useAuthState();
  if (user && (user.role === Roles.ADMIN || roles.includes(user.role))) {
    return <Link {...linkProps} />;
  }
  return null;
};

export default PrivateLink;
