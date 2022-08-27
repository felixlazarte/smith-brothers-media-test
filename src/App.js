import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import User from './features/User/User';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<User/>} />
          <Route path="/dog" element={<div>test</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
