import React, { useState } from 'react';
import { Grid, Tab, Tabs, Box } from '@mui/material';
import { BsBookmarkCheck, BsFillGrid3X3GapFill } from 'react-icons/bs';
import { useNavigate, useParams, Outlet, useLocation } from 'react-router-dom';
import { PostList } from '.';

function TabChoose(props) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  const { userName } = useParams();
  const location = useLocation();
  const isSaved = location.pathname === `/${userName}`;
  return (
    <Grid xs={12}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon label tabs example"
        sx={{ borderTop: '1px solid var(--border-gray)', m: '2rem 0 3rem' }}
      >
        <Tab
          icon={<BsFillGrid3X3GapFill />}
          label="POSTS"
          sx={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            fontSize: '1.3rem',
            p: 0,
            mr: 2,
            '& svg': {
              mr: 1.2,
            },
          }}
          onClick={() => navigate(`/${userName}`)}
        />
        <Tab
          icon={<BsBookmarkCheck />}
          label="SAVED"
          sx={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            fontSize: '1.3rem',
            p: 0,
            mr: 2,
            '& svg': {
              mr: 1.2,
            },
          }}
          onClick={() => {
            navigate(`/${userName}/saved`);
          }}
        />
      </Tabs>
      <>
        <Grid container spacing={2}>
          {!isSaved ? <Outlet /> : <PostList />}
        </Grid>
      </>
    </Grid>
  );
}

TabChoose.propTypes = {};

export default TabChoose;
