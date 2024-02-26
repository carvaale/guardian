import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {  RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './layouts/RootLayout.tsx'
import AuthLayout from './layouts/AuthLayout.tsx'
import ProtectedLayout from './layouts/ProtectedLayout.tsx'
import Register from './pages/Authentication/Register.tsx'
import Home from './pages/Home.tsx'
import Login from './pages/Authentication/Login.tsx'
import ForgotPassword from './pages/Authentication/ForgotPassword.tsx'
import ChatBotPage from './pages/ChatBotPage.tsx'



const router = createBrowserRouter([
  {
    element:<RootLayout/>,
    children:[
      {
        element: <AuthLayout/>,
        children:[
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/register',
          element:<Register/>
        },
        {
          path:'/forgot-password',
          element:<ForgotPassword/>
        }
      ],
      },
      {
        element: <ProtectedLayout/>,
        children:
        [
          {
            path:"/",
            element:<Home />,
          },
          {
            path:"/chatbox",
            element:<ChatBotPage />,
          }

        ],
      }
    ],
  },
  
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
