import { Home, Login, Profile, Register, Saved, Message } from '../page';
import { Auth } from '../page/Auth';
import Layout from '../components/Layout';
let routes = [
  // A route object has the same properties as a <Route>
  // element. The `children` is just an array of child routes.
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'profile', element: <Profile /> },
      { path: 'saved', element: <Saved /> },
      {
        path: 'message',
        element: <Message />,
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
