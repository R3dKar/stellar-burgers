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
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { makeProtected } from '@src/utils/routes/make-protected';
import { AppHeader, OrderInfoModal, IngredientDetailsModal } from '@components';

const AppLayout = () => (
  <div className={styles.app}>
    <AppHeader />
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: ConstructorPage
      },
      {
        path: 'feed',
        children: [
          {
            index: true,
            Component: Feed
          },
          {
            path: ':number',
            Component: OrderInfoModal
          }
        ]
      },
      {
        path: 'login',
        Component: makeProtected(Login, { requireAuthorization: false })
      },
      {
        path: 'register',
        Component: makeProtected(Register, { requireAuthorization: false })
      },
      {
        path: 'forgot-password',
        Component: makeProtected(ForgotPassword, {
          requireAuthorization: false
        })
      },
      {
        path: 'reset-password',
        Component: makeProtected(ResetPassword, { requireAuthorization: false })
      },
      {
        path: 'profile',
        children: [
          {
            index: true,
            Component: makeProtected(Profile)
          },
          {
            path: 'orders',
            children: [
              {
                index: true,
                Component: makeProtected(ProfileOrders)
              },
              {
                path: ':number',
                Component: OrderInfoModal
              }
            ]
          }
        ]
      },
      {
        path: 'ingredients/:id',
        Component: IngredientDetailsModal
      },
      {
        path: '*',
        Component: NotFound404
      }
    ]
  }
]);

const App = () => <RouterProvider router={router} />;

export default App;
