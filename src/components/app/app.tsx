import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '@src/index.css';
import styles from './app.module.css';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '@src/utils/routes/protected-route';
import {
  AppHeader,
  OrderInfoModal,
  IngredientDetailsModal,
  IngredientDetails,
  OrderInfo
} from '@components';
import { useDispatch } from '@src/services/store';
import { useEffect } from 'react';
import { feedRetrieve, ingredientsRetrieve, userRetrieve } from '@slices';

const AppLayout = () => (
  <div className={styles.app}>
    <AppHeader />
    <Outlet />
  </div>
);

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userRetrieve());
    dispatch(ingredientsRetrieve());
    dispatch(feedRetrieve());
  }, []);

  const location = useLocation();
  const backgroundLocation = location.state?.background;

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<ConstructorPage />} />
          <Route path='feed' element={<Feed />} />
          <Route path='feed/:number' element={<OrderInfo />} />
          <Route
            path='login'
            element={
              <ProtectedRoute unauthorizedOnly>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='register'
            element={
              <ProtectedRoute unauthorizedOnly>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='forgot-password'
            element={
              <ProtectedRoute unauthorizedOnly>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='reset-password'
            element={
              <ProtectedRoute unauthorizedOnly>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route path='profile' element={<ProtectedRoute />}>
            <Route index element={<Profile />} />
            <Route path='orders' element={<ProfileOrders />} />
            <Route path='orders/:number' element={<OrderInfo />} />
          </Route>
          <Route path='ingredients/:id' element={<IngredientDetails />} />
          <Route path='*' element={<NotFound404 />} />
        </Route>
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route path='ingredients/:id' element={<IngredientDetailsModal />} />
          <Route path='feed/:number' element={<OrderInfoModal />} />
          <Route
            path='profile/orders/:number'
            element={
              <ProtectedRoute>
                <OrderInfoModal />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
