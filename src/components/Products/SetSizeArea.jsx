import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from '@material-ui/core';
import {
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { useCallback, useMemo, useState } from 'react';
import { TextInput } from '../UIkit';

const useStyles = makeStyles({
  checkIcon: {
    float: 'right',
  },
  iconCell: {
    height: 48,
    width: 48,
  },
});

const SetSizeArea = ({ sizes, setSizes }) => {
  const classes = useStyles();

  const [index, setIndex] = useState(0),
    [size, setSize] = useState(''),
    [quantity, setQuantity] = useState(0);
  const [isErrorSize, setIsErrorSize] = useState(false),
    [errorSizeHelperText, setErrorSizeHelperText] = useState(''),
    [isErrorQuantity, setIsErrorQuantity] = useState(false),
    [errorQuantityHelperText, setErrorQuantityHelperText] = useState('');

  const inputSize = useCallback(
    (event) => {
      const newSize = event.target.value.toUpperCase();
      if (sizes.find((item) => item.size === newSize)) {
        setIsErrorSize(true);
        console.log('find');
        setErrorSizeHelperText('すでに存在しています。');
      } else {
        console.log('findv');
        setIsErrorSize(false);
        setErrorSizeHelperText('');
      }
      setSize(newSize);
    },
    [setSize]
  );
  const inputQuantity = useCallback(
    (event) => {
      if (parseInt(event.target.value) < 0) {
        setIsErrorQuantity(true);
        setErrorQuantityHelperText('正の値を入力してください。');
      } else {
        setIsErrorQuantity(false);
        setErrorQuantityHelperText('');
      }
      setQuantity(event.target.value);
    },
    [setQuantity]
  );

  const isValid = (size, quantity, type) => {
    if (size === '' || quantity === '') {
      alert('未入力の項目が存在します。');
      return false;
    }
    if (parseInt(quantity) < 0) {
      alert('数量はマイナスの値にできません。');
      return false;
    }
    if (type === 'add') {
      if (sizes.find((item) => item.size === size)) {
        alert('すでに存在しています。');
        return false;
      }
    }
    return true;
  };

  const addSize = (index, size, quantity) => {
    const type = index === sizes.length ? 'add' : 'edit';
    if (!isValid(size, quantity, type)) {
      return false;
    }

    if (type === 'add') {
      setSizes((prepState) => [
        ...prepState,
        { size: size, quantity: quantity },
      ]);
      setIndex(index + 1);
      setSize('');
      setQuantity(0);
    } else {
      const newSizes = sizes;
      newSizes[index] = { size: size, quantity: quantity };
      setSizes(newSizes);
      setIndex(newSizes.length);
      setSize('');
      setQuantity(0);
    }
  };

  const editSize = (index, size, quantity) => {
    setIndex(index);
    setSize(size);
    setQuantity(quantity);
  };

  const deleteSize = (deleteIndex) => {
    // const ret = window.confirm('このサイズを削除しますか？');
    // if (!ret) return false;
    const newSizes = sizes.filter((item, i) => i !== deleteIndex);
    setSizes(newSizes);
  };

  const memoIndex = useMemo(() => {
    setIndex(sizes.length);
  }, [sizes]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>サイズ</TableCell>
              <TableCell>数量</TableCell>
              <TableCell className={classes.iconCell}></TableCell>
              <TableCell className={classes.iconCell}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sizes.length > 0 &&
              sizes.map((item, i) => {
                return (
                  <TableRow key={item.size}>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      <IconButton
                        className={classes.iconCell}
                        onClick={() => editSize(i, item.size, item.quantity)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        className={classes.iconCell}
                        onClick={() => deleteSize(i)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <div>
          <TextInput
            fullWidth={false}
            label={'サイズ'}
            multiline={false}
            required={true}
            onChange={inputSize}
            rows={1}
            value={size}
            type={'text'}
            error={isErrorSize}
            helperText={errorSizeHelperText}
          />
          <TextInput
            fullWidth={false}
            label={'数量'}
            multiline={false}
            required={true}
            onChange={inputQuantity}
            rows={1}
            value={quantity}
            type={'number'}
            error={isErrorQuantity}
            helperText={errorQuantityHelperText}
          />
        </div>
        <IconButton
          className={classes.checkIcon}
          onClick={() => addSize(index, size, quantity)}
        >
          <CheckCircleIcon />
        </IconButton>
      </TableContainer>
    </div>
  );
};
export default SetSizeArea;
