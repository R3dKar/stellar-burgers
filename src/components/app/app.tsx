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
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '@src/utils/routes/protected-route';
import { AppHeader, OrderInfoModal, IngredientDetailsModal } from '@components';
import { Provider } from 'react-redux';
import store from '@src/services/store';

const AppLayout = () => (
  <div className={styles.app}>
    <AppHeader />
    <Outlet />
  </div>
);

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<ConstructorPage />} />
          <Route path='feed' element={<Feed />} />
          <Route path='feed/:number' element={<OrderInfoModal />} />
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
            <Route path='orders/:number' element={<OrderInfoModal />} />
          </Route>
          <Route path='ingredients/:id' element={<IngredientDetailsModal />} />
          <Route path='*' element={<NotFound404 />} />
        </Route>
      </Routes>
      {/* <Routes>TODO: перенести модалки сюда</Routes> */}
    </BrowserRouter>
  </Provider>
);

export default App;
