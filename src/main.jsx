import { Profiler, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { UserDataProvider } from "./context/UserDataContext";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import TodoList from './components/TodoList'
import QuickList from './components/QuickList'
import Profile from './components/Profile.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import PublicRoute from './components/PublicRoute.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ForgotPassword from "./components/ForgotPassword";
import About from './components/About.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <ProtectedRoute><QuickList /></ProtectedRoute> },   // ✅ Default page
      { path: 'todos', element: <ProtectedRoute><TodoList /></ProtectedRoute> },
      { path: 'quicklist', element: <ProtectedRoute><QuickList /></ProtectedRoute> },
      { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: 'about', element: <ProtectedRoute><About /></ProtectedRoute> },

      { index: true, element: <PublicRoute><Login /></PublicRoute> },
      { index: true, element: <PublicRoute><Signup /></PublicRoute> },
      { index: true, element: <PublicRoute><ForgotPassword /></PublicRoute> },

      { path: 'login', element: <PublicRoute><Login /></PublicRoute> },
      { path: 'signup', element: <PublicRoute><Signup /></PublicRoute> },
      { path: 'forgot-password', element: <PublicRoute><ForgotPassword /></PublicRoute> },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserDataProvider>
      <RouterProvider router={router} />
    </UserDataProvider>
  </StrictMode>,
)
