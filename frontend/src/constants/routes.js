import { Home, Login, Register } from '../page';
import { Auth } from '../page';
let routes = [
  // A route object has the same properties as a <Route>
  // element. The `children` is just an array of child routes.
  { path: '/', element: <Home /> },
  {
    path: 'accounts',
    element: <Auth />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
];

export default routes;
