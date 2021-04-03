import { Badge, IconButton } from '@material-ui/core';
import { FavoriteBorder, Menu, ShoppingCart } from '@material-ui/icons';
import React from 'react';

const HeaderMenus = () => {
  return (
    <>
      <IconButton>
        <Badge badgeContent={3} color='secondary'>
          <ShoppingCart />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorder />
      </IconButton>
      <IconButton>
        <Menu />
      </IconButton>
    </>
  );
};

export default HeaderMenus;
