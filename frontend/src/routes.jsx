
import App from './App'
import UserSettings from './admin/UsersData/userData';
import LoginPage from './admin/UsersData/log';
import UpdateAccount from './admin/UsersData/update';
import CreateAccount from './admin/UsersData/account';
import Dashboard from './admin/dashboard';
import CreateNewArticle from './admin/articles';
import MyTime from './admin/UsersData/allUsers';
import CreateNewCategory from './admin/category';

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
     },
     {
      path: 'new-article',
      element: <CreateNewArticle />
     },
     {
      path: 'time',
      element: <MyTime />
     },
     {
      path: 'new-category',
      element: <CreateNewCategory />
     },
  ]);
  
 export default routes;