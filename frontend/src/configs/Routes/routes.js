import {
  Home,
  Login,
  Profile,
  Register,
  Saved,
  Message,
  PostView,
  EditProfile,
  ViewPostDetail,
  NotFound,
} from '../../page';
import { Auth } from '../../page/Auth';
import Layout from '../../components/Layout';
import { FormEditProfile } from '../../page/EditProfile';
import ProtectedRoute from './ProtectedRoute';

let routes = (isLogin) => [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute isLogin={isLogin}>
            <Home />
          </ProtectedRoute>
        ),
        children: [{ path: 'view-h/:idPost', element: <PostView /> }],
      },
      {
        path: ':userName',
        element: (
          <ProtectedRoute isLogin={isLogin}>
            <Profile />
          </ProtectedRoute>
        ),
        children: [
          { path: 'saved', element: <Saved /> },
          { path: 'view-p/:idPost', element: <PostView /> },
        ],
      },

      {
        path: 'saved',
        element: (
          <ProtectedRoute isLogin={isLogin}>
            <Saved />
          </ProtectedRoute>
        ),
      },
      {
        path: 'edit-profile',
        element: (
          <ProtectedRoute isLogin={isLogin}>
            <EditProfile />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <FormEditProfile />,
          },
          {
            path: 'change-password',
            element: <FormEditProfile />,
          },
        ],
      },
      {
        path: 'message',
        element: (
          <ProtectedRoute isLogin={isLogin}>
            <Message />
          </ProtectedRoute>
        ),
      },
      {
        path: 'view-post-detail/:idPost',
        element: (
          <ProtectedRoute isLogin={isLogin}>
            <ViewPostDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: 'not-found',
        element: <NotFound />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: 'accounts',
    element: <Auth />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'edit', element: <Register /> },
    ],
  },
];

export default routes;
