import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBarComponent from './components/NavBarComponent';
import Viewer from './pages/Viewer';
import Home from './pages/Home';
import logo from './logo.svg';
import './App.css';

function App() {

  const containerStyle = { 
    backgroundColor: 'rgb(106, 113, 125)',
    color: 'white',
    minHeight: '100vh',
    width: '100%',
    padding: '0',
  }

  return (
    <Router>
      <NavBarComponent />
      <Container fluid style={containerStyle}>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/viewer" Component={Viewer} />
        </Routes>
      </Container>
    </Router>
  );
}


export default App;
