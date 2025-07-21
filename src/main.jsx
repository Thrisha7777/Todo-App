import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="638446567432-sj3g5715me1pi5pb4do291efs2fan00v.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);


