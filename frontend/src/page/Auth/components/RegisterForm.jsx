import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as yup from 'yup';
import { images } from '../../../constants';
import { InputField, PasswordField } from '../../../form-control';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FillFacebook } from '../../../components/Icons';

const useStyles = makeStyles({
  loginForm: {
    width: 'calc(100% - 2rem)',
    border: '1px solid var(--border-gray)',
    padding: '1.8rem 1rem',
    marginBottom: '1rem',
  },
  logo: {
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '2rem 0 ',
  },
  boxForm: {
    display: 'flex',
    justifyContent: 'center',
  },
  line: {
    backgroundColor: 'var(--border-gray)',
    width: '45%',
    height: '0.2rem',
    position: 'relative',
    top: '0.4rem',
  },
  boxButton: {
    display: 'block',
    width: '100%',
    border: 'none',
    padding: '2.3rem 0',
    backgroundColor: 'transparent',
    '& span': {
      color: '#385185',
      cursor: 'pointer',
      '& svg': {
        marginRight: '0.5rem',
        fontSize: '1.7rem',
        position: 'relative',
        top: '0.4rem',
      },
    },
  },
  link: {
    display: 'block',
    textAlign: 'center',
    fontSize: '1.5rem',
    color: '#00376b',
  },
});
const RegisterForm = ({ initialValues, onSubmit }) => {
  const classes = useStyles();
  const schema = yup.object().shape({
    email: yup.string().required('Please enter username and try again.'),
    fullName: yup
      .string()
      .required('Please enter full name and try again.')
      .test(
        'Should has at least two words',
        'Please enter at least two words',
        (value) => {
          return value.split(' ').length >= 2;
        }
      ),
    userName: yup
      .string()
      .required('Please enter user name and try again.')
      .matches(/^(?=.*[A-Z])/, 'Must one Uppercase')
      .matches(/^(?=.*[a-z])/, 'Must one Lowercase')
      .matches(/^(?=.*\d)[a-zA-Z\d]/, 'Must one Number')
      .matches(/^(?=.*[@$!%*#?&])/, 'Must one special case Character'),
    password: yup
      .string()
      .required('Please enter passwork and try again.')
      .min(8),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  //   handle onsubmit register
  const handleOnSubmit = (data) => {
    if (!onSubmit) return;
    onSubmit(data);
  };
  return (
    <Box className={classes.loginForm}>
      <Box component="img" src={images.LOGO} className={classes.logo} />
      <Typography variant="h4" align="center" sx={{ paddingBottom: '1rem' }}>
        Sign up see photos and video from yours friends
      </Typography>
      <Box className={classes.boxForm}>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Box sx={{ width: '25rem' }}>
            <InputField
              placeholder="Phone number, username, or email"
              name="email"
              control={control}
              errors={errors}
            />
            <InputField
              placeholder="Full name"
              name="fullName"
              control={control}
              errors={errors}
            />
            <InputField
              placeholder="User name"
              name="userName"
              control={control}
              errors={errors}
            />
            <PasswordField
              placeholder="Password"
              name="password"
              control={control}
              errors={errors}
            />
            <Box sx={{ marginBottom: '1.5rem' }}>
              <Button variant="contained" sx={{ width: '100%' }} type="submit">
                Sign up
              </Button>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box className={classes.line}></Box>
              <Box>OR</Box>
              <Box className={classes.line}></Box>
            </Box>

            <Box>
              <Box component="button" className={classes.boxButton}>
                <Box component="span">
                  <FillFacebook />
                  Login with facebook
                </Box>
              </Box>

              <Box
                sx={{
                  fontSize: '1.4rem',
                  textAlign: 'center',
                  lineHeight: '1.7rem',
                  '& strong': { fontWeight: '600' },
                }}
              >
                By signing up, you agree to our
                <strong> Terms, Data Policy</strong> and
                <strong> Cookie Policy</strong>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default RegisterForm;
