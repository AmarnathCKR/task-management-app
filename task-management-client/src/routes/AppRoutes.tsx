import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';
import { ROUTES } from '../constants/routes';
import type { RootState } from '../store';

const AppRoutes = () => {
  const { accessToken } = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      <Route path={ROUTES.SIGN_IN} element={"Login"} />
      <Route path={ROUTES.SIGN_UP} element={"sing up"} />

      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
           Home
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.ADD_TASK}
        element={
          <ProtectedRoute>
            Add
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.EDIT_TASK}
        element={
          <ProtectedRoute>
            Edit
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.ROOT}
        element={
          <Navigate
            to={accessToken ? ROUTES.DASHBOARD : ROUTES.SIGN_IN}
            replace
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
