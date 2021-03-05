import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  close: {
    position: 'absolute',
    top: 2,
    right: 2,
    'z-index': 10,
  },
});

const ImagePreview = (props) => {
  const styles = useStyles();
  return (
    <div className='p-media__thumb'>
      <ClearIcon
        className={styles.close}
        onClick={() => props.delete(props.id)}
      />
      <img alt='プレビュー画像' src={props.path} />
    </div>
  );
};
export default ImagePreview;
