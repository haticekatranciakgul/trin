import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store'; // Redux store'unuzu import edin

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Uygulamanızı Redux Provider ile sarın */}
      <App />
    </Provider>
  </React.StrictMode>
);