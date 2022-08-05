/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import * as yup from 'yup';
import { authApi, userApi } from '../../../api';
import { InputField, PasswordField } from '../../../form-control';
import Inputfield from '../../../form-control/InputField';
import { getUserId, toastify } from '../../../utils';
import { editProfile } from '../../Auth/authSlice';

function FormEditProfile() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isFormPassword = location.pathname === '/edit-profile/change-password';
  const schemaChangeName = yup.object().shape({
    fullName: yup.string().required('Please enter fullName.'),
    userName: yup.string().required('Please enter username.'),
  });
  const schemaChangePassword = yup.object().shape({
    password: yup
      .string()
      .required('Please enter password and try again.')
      .min(8),
    newPassword: yup
      .string()
      .required('Please enter new password and try again.')
      .min(8),
    confirmPassword: yup
      .string()
      .required('Please retype your confirm password')
      .oneOf([yup.ref('newPassword')], 'Password does not match'),
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid, isValidating },
  } = useForm({
    resolver: yupResolver(
      isFormPassword ? schemaChangePassword : schemaChangeName
    ),
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
      toastify('success', 'Change userName successfully');
    } catch (error) {}
  };
  const handleOnChangePassword = async (data) => {
    const { newPassword } = data;
    try {
      await authApi.resetPassword({ newPassword });
      reset({
        password: '',
        newPassword: '',
        confirmPassword: '',
      });
      toastify('success', 'Change password successfully');
    } catch (error) {}
  };
  return (
    <Paper sx={{ p: 3 }}>
      {!isFormPassword && (
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="span"
              sx={{
                fontSize: '1.5rem',
                fontWeight: '600',
                mb: '1rem',
                flex: 2,
              }}
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
              sx={{
                fontSize: '1.5rem',
                fontWeight: '600',
                mb: '1rem',
                flex: 2,
              }}
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
      )}
      {isFormPassword && (
        <form onSubmit={handleSubmit(handleOnChangePassword)}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="span"
              sx={{
                fontSize: '1.5rem',
                fontWeight: '600',
                mb: '1rem',
                flex: 2,
              }}
            >
              Old Password
            </Typography>
            <PasswordField
              placeholder="Old password"
              control={control}
              name="password"
              errors={errors}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="span"
              sx={{
                fontSize: '1.5rem',
                fontWeight: '600',
                mb: '1rem',
                flex: 2,
              }}
            >
              New Password
            </Typography>
            <PasswordField
              placeholder="New password"
              control={control}
              name="newPassword"
              errors={errors}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="span"
              sx={{
                fontSize: '1.5rem',
                fontWeight: '600',
                mb: '1rem',
                flex: 2,
              }}
            >
              Confirm New Password
            </Typography>
            <PasswordField
              placeholder="Confirm new password"
              control={control}
              name="confirmPassword"
              errors={errors}
            />
          </Box>

          <Button type="submit" variant="contained">
            Change password
          </Button>
        </form>
      )}
    </Paper>
  );
}

FormEditProfile.propTypes = {};

export default FormEditProfile;
