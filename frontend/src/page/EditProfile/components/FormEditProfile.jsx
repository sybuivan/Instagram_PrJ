import { Box, Button, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { userApi } from '../../../api';
import { InputField } from '../../../form-control';
import Inputfield from '../../../form-control/InputField';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getUserId } from '../../../utils';
import { useDispatch } from 'react-redux';
import { editProfile } from '../../Auth/authSlice';

function FormEditProfile() {
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    fullName: yup.string().required('Please enter fullName.'),
    userName: yup.string().required('Please enter username.'),
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const getUser = async () => {
    try {
      const user = await userApi.getUser();

      reset({
        fullName: user.fullName,
        userName: user.userName,
      });
    } catch (error) {}
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleOnSubmit = async (data) => {
    const { userName, fullName } = data;
    try {
      const res = await userApi.editProfile({
        userId: getUserId(),
        userName: userName,
        fullName: fullName,
      });
      dispatch(editProfile({ userName: res.user.userName }));
    } catch (error) {}
  };
  return (
    <Paper sx={{ p: 3 }}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="span"
            sx={{ fontSize: '1.5rem', fontWeight: '600', mb: '1rem', flex: 1 }}
          >
            Full name
          </Typography>
          <Inputfield
            placeholder="Full name"
            control={control}
            name="fullName"
            errors={errors}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="span"
            sx={{ fontSize: '1.5rem', fontWeight: '600', mb: '1rem', flex: 1 }}
          >
            User Name
          </Typography>
          <InputField
            placeholder="User Name"
            control={control}
            name="userName"
            errors={errors}
          />
        </Box>

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Paper>
  );
}

FormEditProfile.propTypes = {};

export default FormEditProfile;
