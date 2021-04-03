import React from 'react';

import { fade, makeStyles, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import logo from '../../assets/img/icons/logo.png';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import History from '@material-ui/icons/History';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch, useSelector } from 'react-redux';
import { getIsSignedIn } from '../../reducks/users/selectors';
import { push } from 'connected-react-router';
import { HeaderMenus } from '.';

const useStyles = makeStyles((theme) => ({
  root: {
    flwxGrow: 1,
  },
  menuBar: {
    backgroundColor: '#fff',
    color: '#444',
  },
  toolBar: {
    margin: '0 auto',
    maxWidth: 1024,
    width: '100%',
  },
  iconButtons: {
    margin: '0 0 0 auto',
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <img
            src={logo}
            alt='logo'
            width='50px'
            onClick={() => dispatch(push('/'))}
          />
          {isSignedIn && (
            <div className={classes.iconButtons}>
              <HeaderMenus />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
