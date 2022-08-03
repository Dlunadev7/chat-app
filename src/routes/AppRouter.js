import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

import { ChatScreen } from '../screens/ChatScreen';
import { ComplaintsScreen } from '../screens/ComplaintsScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { Login } from '../components/auth/Login';
import { SignUp } from '../components/auth/SignUp';
import { HomeScreen } from '../screens/HomeScreen';
import { UserInformationContext } from '../context/User';


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={
            <UserInformationContext>
              <PrivateRoutes>
                <Routes>
                  <Route path="home/*" element={<HomeScreen />}>
                    <Route path="" element={<ChatScreen />} />
                    <Route path="complaints" element={<ComplaintsScreen />} />
                  </Route>
                </Routes>
              </PrivateRoutes>
            </UserInformationContext>
          }/>

          <Route path="auth/*" element={
            <PublicRoutes>
              <Routes>
                <Route path="/*" element={<LoginScreen />}>
                  <Route path="login" element={<Login />} />
                  <Route path="signUp" element={<SignUp />} />
                </Route>
              </Routes>
            </PublicRoutes>
          
          }/>

      </Routes>
    </BrowserRouter>
  )
}
