import { Grid, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box, Container } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import json2mq from 'json2mq';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { images, navRoutesIcon } from '../../constants';
import { hiddenModal, showModal } from '../../page/Home/homeSlice';
import { CreateNewPost } from '../../features/Post/components';
import { logout } from '../../page/Auth/authSlice';
import { BasicModal } from '../Modal';
import { LinkItem, MenuFrofile } from '.';
import { ResultRearch, Search } from '..';
import { userApi } from '../../api';
import { useDebounce } from '../../hooks';
import { AccountCircle } from '../Icons';

const useStyles = makeStyles({
  root: {
    height: '6rem',
    border: '1px solid var(--border-gray)',
    marginBottom: '3rem',
    backgroundColor: 'var(--color-white)',
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 10,
  },

  header: {
    height: '100%',
  },
  containerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
});

const Header = () => {
  const classes = useStyles();
  const matches = useMediaQuery(
    json2mq({
      maxWidth: 750,
    })
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isShowModal = useSelector((state) => state.home.modal);
  const handleOnClickShowMore = () => {
    dispatch(showModal('CREATE_POST'));
  };
  const handleOnClickHideModal = () => {
    dispatch(hiddenModal('CREATE_POST'));
  };

  const [openMenu, setOpenMenu] = useState(false);
  const [focused, setFocused] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  const [valueSearch, setValueSearch] = useState('');
  const [listResult, setListResult] = useState([]);
  const valueDebounce = useDebounce(valueSearch, 500);
  useEffect(() => {
    (async () => {
      try {
        if (valueDebounce) {
          const { listResult } = await userApi.findUsers(valueDebounce);
          console.log(listResult);
          setListResult(listResult);
          setShowLoading(false);
        }
      } catch (error) {}
    })();
  }, [valueDebounce]);

  const handleOnChangeSearch = (value) => {
    if (!!value) {
      setFocused(true);
      setShowLoading(true);
      setValueSearch(value);
    } else {
      setFocused(false);
    }
  };

  const memoizedCard = useMemo(() => {
    return (
      <BasicModal
        component={<CreateNewPost />}
        showModal={isShowModal.CREATE_POST}
        onClickHideModal={handleOnClickHideModal}
      />
    );
  }, [isShowModal]);

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Container
          maxWidth="false"
          sx={{ maxWidth: '97.5rem', height: '100%' }}
        >
          <Grid container className={classes.containerWrapper}>
            <Grid item md={2} sx={{ display: matches && 'none' }}>
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
                  showLoading={showLoading}
                  placeholder="Search user accounts"
                />
                <ResultRearch focused={focused} listResult={listResult} />
              </Box>
            </Grid>

            <Grid item md={4}>
              {navRoutesIcon.map((item) => (
                <>
                  {item?.path ? (
                    <LinkItem
                      path={item?.path}
                      icon={item.icon}
                      key={item.id}
                    />
                  ) : (
                    <LinkItem
                      icon={item.icon}
                      key={item.id}
                      onShowModal={handleOnClickShowMore}
                    />
                  )}
                </>
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
                <AccountCircle />
                {openMenu && (
                  <MenuFrofile
                    openMenu={openMenu}
                    onClickLogout={() => {
                      dispatch(logout());
                      navigate('/accounts/login');
                    }}
                  />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </Container>
        {memoizedCard}
      </Box>
    </Box>
  );
};

export default Header;
