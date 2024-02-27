import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import RootLayout from './layouts/RootLayout.tsx';
import { AuthProvider } from './layouts/AuthContext.tsx';
import ProtectedLayout from './layouts/ProtectedLayout.tsx';
import Register from './pages/Authentication/Register.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Authentication/Login.tsx';
import ChatBotPage from './pages/ChatBotPage.tsx';
import ForgotPassword from './pages/Authentication/ForgotPassword.tsx';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
        <AuthProvider>
          <RootLayout/>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/forgot-password" element={<ForgotPassword/>}/>
            
            <Route path="/chat" element={<ChatBotPage/>}/>
            <Route element={<ProtectedLayout />}>
              <Route path="/" element={<Home/>}/>
              
              
            </Route>
          </Routes>
        </AuthProvider>
    </Router>
  </React.StrictMode>,
);
