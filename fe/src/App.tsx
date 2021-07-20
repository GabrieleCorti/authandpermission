import React from 'react';
import LogSub from './components/LogSub';
import ToDo from './components/ToDo';
import {BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    
      <div>
        <Router>
          <Route exact path='/register'>
            <LogSub links={['Login', 'ToDo']} isSigIn={true} title="Registrati al ToDo con Admin" />
          </Route>
          <Route exact path='/login'>
            <LogSub links={['Register', 'ToDo']} isSigIn={false} title="Loggati per accedere al ToDo "/>
          </Route>
          <Route exact path='/ToDo'>
            <ToDo />
          </Route>
        </Router>  
      </div>
    
    
  );
}

export default App;
