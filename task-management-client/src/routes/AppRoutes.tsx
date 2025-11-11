import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';
import { ROUTES } from '../constants/routes';
import type { RootState } from '../store';
import Login from '../pages/Login';
import Register from '../pages/Register';
import MainLayout from '../layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import AddTask from '../pages/AddTask';
import EditTask from '../pages/EditTast';

const AppRoutes = () => {
  const { accessToken } = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path={ROUTES.SIGN_IN}
          element={
            accessToken ? <Navigate to={ROUTES.DASHBOARD} replace /> : <Login />
          }
        />
        <Route
          path={ROUTES.SIGN_UP}
          element={
            accessToken ? <Navigate to={ROUTES.DASHBOARD} replace /> : <Register />
          }
        />
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.ADD_TASK}
          element={
            <ProtectedRoute>
              <AddTask />
            </ProtectedRoute>
          }
        />

        <Route
          path={`${ROUTES.EDIT_TASK}/:id`}
          element={
            <ProtectedRoute>
              <EditTask />
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
        /></Route>
    </Routes>
  );
};

export default AppRoutes;
