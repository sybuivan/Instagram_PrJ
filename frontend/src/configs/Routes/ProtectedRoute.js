import { Navigate } from 'react-router';

const ProtectedRoute = ({ isLogin, children }) => {
  if (!isLogin) {
    return <Navigate to="/accounts/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
