import React from 'react';
import { ToastContainer } from 'react-toastify';

import { AuthContext } from './context/Auth';
import { AppRouter } from './routes/AppRouter';

import './styles/index.css';
import './styles/screens/complaints.css';
import './styles/screens/home.css';
import './styles/screens/login.css';

export const App = () => {

  return (
    <div className="App">
      <AuthContext>
        <AppRouter />
      </AuthContext>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </div>
  );
}
