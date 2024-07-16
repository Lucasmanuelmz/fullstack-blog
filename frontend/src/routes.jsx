
import App from './App'
import UserSettings from './admin/UsersData/userData';
import LoginPage from './admin/UsersData/log';
import UpdateAccount from './admin/UsersData/update';
import CreateAccount from './admin/UsersData/account';
import Dashboard from './admin/dashboard';

  const routes = ([
    {
      path: "/",
      element: <App />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />
    },
    {
      path: '/login',
      element: <LoginPage />
      },
    {
      path: '/myaccount',
      element:<UserSettings />,
     
    }, 
    {
      path: '/update/:id',
      element: <UpdateAccount />
    },
     {
       path: '/new-account',
       element: <CreateAccount />
     } 
   
  ]);
  
 export default routes;