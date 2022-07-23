import { Grid, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box, Container } from '@mui/system';
import React, { useMemo, useState } from 'react';
import { RiAccountCircleFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BasicModal } from '..';
import { images, navRoutes } from '../../constants';
import { hiddenModal, showModal } from '../../page/Home/homeSlice';
import { CreateNewPost } from '../NewPost';
import Search from '../Search';
import LinkItem from './LinkItem';
import Menu from './MenuFrofile';
import ResultRearch from './ResultRearch';

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
  console.log('header');
  const classes = useStyles();
  const dispatch = useDispatch();
  const isShowModal = useSelector((state) => state.home.modal);
  const handleOnClickShowMore = () => {
    dispatch(showModal('CREATE_POST'));
  };
  const handleOnClickHideModal = () => {
    dispatch(hiddenModal('CREATE_POST'));
  };

  const [openMenu, setOpenMenu] = useState(false);
  const [focused, setFocused] = useState(false);
  const [valueSearch, setValueSearch] = useState('');
  const [listResult, setListResult] = useState([]);
  const user = [
    { userName: 'ha', fullName: 'ha nguyen' },
    { userName: 'quang', fullName: 'ha nguyen' },
    { userName: 'linh2', fullName: 'ha nguyen' },
    { userName: 'halinh.23', fullName: 'ha nguyen' },
  ];
  const handleOnChangeSearch = (value) => {
    console.log(!value);
    if (!!value) {
      setFocused(true);
      setValueSearch(value);
      setListResult(user.filter((item) => item.userName.includes(value)));
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
                <ResultRearch focused={focused} listResult={listResult} />
              </Box>
            </Grid>

            <Grid item md={4}>
              {navRoutes.map((item, index) => (
                <>
                  {item?.path ? (
                    <LinkItem path={item?.path} icon={item.icon} key={index} />
                  ) : (
                    <LinkItem
                      icon={item.icon}
                      key={index}
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
                <RiAccountCircleFill />
                {openMenu && <Menu openMenu={openMenu} />}
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
