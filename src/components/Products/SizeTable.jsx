import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
} from '@material-ui/core';
import {
  FavoriteBorder as FavoriteBorderIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles({
  checkIcon: {
    float: 'right',
  },
  iconCell: {
    height: 48,
    width: 48,
  },
});

const SizeTable = ({ productId, sizes }) => {
  const classes = useStyles();

  const addToShoppingCart = (size, quantity) => {
    if (!quantity || quantity <= 0) {
      alert('売り切れです');
    } else {
      alert(`size:${size}がカートに追加されました。`);
    }
  };

  const addToFavorite = (productId, size, quantity) => {
    alert('お気に入りに追加しました。');
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {sizes.length > 0 &&
              sizes.map((item, i) => {
                return (
                  <TableRow key={item.size}>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>残り {item.quantity} 点</TableCell>
                    <TableCell>
                      <IconButton
                        className={classes.iconCell}
                        onClick={() =>
                          addToShoppingCart(item.size, item.quantity)
                        }
                      >
                        <ShoppingCartIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        className={classes.iconCell}
                        onClick={() =>
                          addToFavorite(productId, item.size, item.quantity)
                        }
                      >
                        <FavoriteBorderIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SizeTable;
