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
} from '../page';
import { Auth } from '../page/Auth';
import Layout from '../components/Layout';
import { FormEditProfile } from '../page/EditProfile';
let routes = [
  // A route object has the same properties as a <Route>
  // element. The `children` is just an array of child routes.
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
        children: [{ path: 'view-h/:idPost', element: <PostView /> }],
      },
      {
        path: ':userName',
        element: <Profile />,
        children: [
          { path: 'saved', element: <Saved /> },
          { path: 'view-p/:idPost', element: <PostView /> },
        ],
      },

      { path: 'saved', element: <Saved /> },
      {
        path: 'edit-profile',
        element: <EditProfile />,
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
        element: <Message />,
      },
      {
        path: 'view-post-detail/:idPost',
        element: <ViewPostDetail />,
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
