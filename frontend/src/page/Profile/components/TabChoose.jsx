import { Grid, Tab, Tabs } from '@mui/material';
import React from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { PostList } from '.';
import { BookmarkCheck, FillGrid3X3GapFill } from '../../../components/Icons';

function TabChoose({ listPost }) {
  console.log('listPost', listPost);
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
          icon={<FillGrid3X3GapFill />}
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
          icon={<BookmarkCheck />}
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
          {!isSaved ? <Outlet /> : <PostList listPost={listPost} />}
        </Grid>
      </>
    </Grid>
  );
}

TabChoose.propTypes = {};

export default TabChoose;
