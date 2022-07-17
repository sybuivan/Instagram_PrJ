import React, { useState } from 'react';
import { Box, Container } from '@mui/system';
import {
  Grid,
  IconButton,
  InputBase,
  Paper,
  MenuItem,
  List,
  ListItemIcon,
  ListItemButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { images } from '../constants';
import { BsSearch } from 'react-icons/bs';
import { makeStyles } from '@mui/styles';
import { AiFillHome, AiOutlineHeart } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { RiAccountCircleFill } from 'react-icons/ri';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { BsBookmarkCheck } from 'react-icons/bs';

const useStyles = makeStyles({
  root: {
    height: '6rem',
    border: '1px solid var(--border-gray)',
  },
  header: {
    height: '100%',
  },
  containerWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  logo: {
    width: '10.3rem',
    height: '2.9rem',
  },
  navIcon: {
    position: 'relative',
    '& > svg': {
      fontSize: '2.5rem',
    },
  },
  navDown: {
    '& .css-1ps6pg7-MuiPaper-root': {
      position: 'absolute',
      top: '3.2rem',
      right: 0,
      width: '20rem',
      '& .MuiListItemButton-root': {
        fontSize: '1.6rem',
      },
    },
  },
});

const Header = () => {
  const classes = useStyles();

  const [openMenu, setOpenMenu] = useState(false);
  const renderMenu = (
    <List className={openMenu ? classes.navDown : ''}>
      <Paper>
        <ListItemButton>
          <ListItemIcon>
            <RiAccountCircleFill />
          </ListItemIcon>
          Profile
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <BsBookmarkCheck />
          </ListItemIcon>
          Saved
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <FiSettings />
          </ListItemIcon>
          Settings
        </ListItemButton>
        <ListItemButton sx={{ borderTop: '0.1rem solid var(--border-gray)' }}>
          <ListItemIcon>
            <FiLogOut fontSize="small" />
          </ListItemIcon>
          Logout
        </ListItemButton>
      </Paper>
    </List>
  );
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Container
          maxWidth="false"
          sx={{ maxWidth: '97.5rem', height: '100%' }}
        >
          <Grid container className={classes.containerWrapper}>
            <Grid item md={4}>
              <Box>
                <Link to="/">
                  <Box
                    className={classes.logo}
                    component="img"
                    src={images.LOGO}
                  />
                </Link>
              </Box>
            </Grid>

            <Grid item md={4}>
              <Paper sx={{ width: '27rem', display: 'flex' }}>
                <InputBase
                  sx={{ ml: 1, flex: 1, fontSize: '1.3rem' }}
                  placeholder="Search Google Maps"
                  inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton
                  type="submit"
                  sx={{ p: '10px' }}
                  aria-label="search"
                >
                  <BsSearch />
                </IconButton>
              </Paper>
            </Grid>

            <Grid item md={4}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                className={classes.navIcon}
              >
                <AiFillHome />
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                className={classes.navIcon}
              >
                <FiSend />
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                className={classes.navIcon}
              >
                <BiMessageSquareAdd />
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                className={classes.navIcon}
              >
                <AiOutlineHeart />
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                className={classes.navIcon}
                onClick={() => setOpenMenu((pre) => !pre)}
              >
                <RiAccountCircleFill />
                {openMenu && renderMenu}
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

Header.propTypes = {};

export default Header;
