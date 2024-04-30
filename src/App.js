import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBarComponent from './components/NavBarComponent';
import Viewer from './pages/Viewer';
import Home from './pages/Home';
import logo from './logo.svg';
import './App.css';
function App() {
  return (
    <Router>
      <Container>
        <NavBarComponent />
        <Routes>
          <Route path="/viewer" Component={Viewer} />
          <Route path="/" Component={Home} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
