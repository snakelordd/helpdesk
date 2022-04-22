import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import TicketStore from './store/TicketStore';
import App from './App'
import UserStore from './store/UserStore';
import TicketPropsStore from './store/TicketPropsStore';
import MessageStore from './store/MessageStore';
import './styles/styles.css'
export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={
      {
        user: new UserStore(),
        tickets: new TicketStore(),
        ticketProps: new TicketPropsStore(),
        message: new MessageStore()
      }
    }>
      <App />
    </Context.Provider>,
  document.getElementById('root')
);

