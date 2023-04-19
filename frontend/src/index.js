import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import TransactionsStore from "./store/TransactionsStore";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    transactions: new TransactionsStore()
  }}>
    <App />
  </Context.Provider>
);
