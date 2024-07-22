
import App from './App'
import UserSettings from './admin/UsersData/userData';
import LoginPage from './admin/UsersData/log';
import UpdateAccount from './admin/UsersData/update';
import CreateAccount from './admin/UsersData/account';
import Dashboard from './admin/dashboard';
import CreateNewArticle from './admin/articles';
import MyTime from './admin/UsersData/allUsers';
import CreateNewCategory from './admin/category';
import UpdateArticle from './admin/articles/update';
import UpdateCategory from './admin/category/update';
import ReadingPage from './public/page';
import Header from './admin/header';
import ErrorPage from './error/errorPage';

  const routes = ([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage/>
    },
    {
      path: '/dashboard/',
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
      path: '/article/:id',
      element: <UpdateArticle />
    },
     {
      path: 'time',
      element: <MyTime />
     },
     {
      path: 'new-category',
      element: <CreateNewCategory />
     },
     {
      path: '/category/:id',
      element: <UpdateCategory />
     },
     {
      path: '/:slug',
      element: <ReadingPage />
     },
     {
      path:'header/:slug',
      element: <Header />
     }
  ]);
  
 export default routes;