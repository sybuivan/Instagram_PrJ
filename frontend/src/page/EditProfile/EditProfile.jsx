import React from 'react';
import SideBarEdit from './components/SideBarEdit';
import FormEditProfile from './components/FormEditProfile';
import { Grid } from '@mui/material';
import { Outlet } from 'react-router';

function EditProfile() {
  return (
    <>
      <Grid item xs={5}>
        <SideBarEdit />
      </Grid>
      <Grid item xs={7}>
        <Outlet />
      </Grid>
    </>
  );
}

EditProfile.propTypes = {};

export default EditProfile;
