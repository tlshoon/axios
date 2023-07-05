import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import List from './List';
import Profile from './Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <List />
    <Profile />
  </React.StrictMode>
);

