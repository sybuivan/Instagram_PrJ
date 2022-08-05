import { toast } from 'react-toastify';

export const resetTimeout = (timeoutRef) => {
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }
};

export const setSession = (accessToken, refreshToken, username, userId) => {
  localStorage.setItem('user-name', username);
  localStorage.setItem('user-id', userId);
  localStorage.setItem('x-access-token', accessToken);
  localStorage.setItem('x-refresh-token', refreshToken);
};

export const removeSession = () => {
  localStorage.removeItem('user-name');
  localStorage.removeItem('user-id');
  localStorage.removeItem('x-access-token');
  localStorage.removeItem('x-refresh-token');
};
export const getUserId = () => {
  return localStorage.getItem('user-id');
};
export const getUserName = () => {
  return localStorage.getItem('user-name');
};

export const setUserName = (username) => {
  return localStorage.setItem('user-name', username);
};

export const getToken = () => {
  return localStorage.getItem('x-refresh-token');
};

export const toastify = (type, label) => {
  switch (type) {
    case 'success': {
      toast.success(label, {
        position: 'top-right',
        autoClose: 3000,
      });
      break;
    }
    case 'error': {
      toast.error(label, {
        position: 'top-right',
        autoClose: 3000,
      });
      break;
    }
    default:
      break;
  }
};
