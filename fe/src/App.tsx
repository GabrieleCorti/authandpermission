import React from 'react';
import LogIn from './components/LogIn';
import {BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    
      <div>
        <Router>
        <Route exact path='/register'>
          <LogIn links={['Login', 'ToDo']} />
        </Route>
        </Router>  
      </div>
    
    
  );
}

export default App;
