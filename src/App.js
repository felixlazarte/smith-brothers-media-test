import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import User from './features/User';
import Dog from './features/Dog';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<User/>} />
          <Route path="/dog" element={<Dog />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
