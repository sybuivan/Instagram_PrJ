import { Grid, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box, Container } from '@mui/system';
import React, { useState } from 'react';
import { AiFillHome, AiOutlineHeart } from 'react-icons/ai';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { FiSend } from 'react-icons/fi';
import { RiAccountCircleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { images, navRoutes } from '../../constants';
import Search from '../Search';
import LinkItem from './LinkItem';
import Menu from './Menu';
import ResultRearch from './ResultRearch';

const useStyles = makeStyles({
  root: {
    height: '6rem',
    border: '1px solid var(--border-gray)',
    marginBottom: '3rem',
    backgroundColor: 'var(--color-white)',
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
});

const Header = () => {
  const classes = useStyles();

  const [openMenu, setOpenMenu] = useState(false);
  const [focused, setFocused] = useState(false);
  const [valueSearch, setValueSearch] = useState('');
  const handleOnChangeSearch = (value) => {
    setFocused(true);
    setValueSearch(value);
  };
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
              <Box sx={{ position: 'relative' }}>
                <Search
                  onChangeSearch={handleOnChangeSearch}
                  focused={focused}
                  valueSearch={valueSearch}
                />
                <ResultRearch focused={focused} />
              </Box>
            </Grid>

            <Grid item md={4}>
              {navRoutes.map((item, index) => (
                <LinkItem path={item?.path} icon={item.icon} key={index} />
              ))}

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
                {openMenu && <Menu openMenu={openMenu} />}
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Header;
