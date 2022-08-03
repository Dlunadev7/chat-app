import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { GlobalContext } from '../context/Auth';

export const PublicRoutes = ({children}) => {
  
  const { state } = useContext(GlobalContext);

  const { isLoggedIn } = state;

  return (!isLoggedIn)
    ? children
    : <Navigate to="/home" />

}
