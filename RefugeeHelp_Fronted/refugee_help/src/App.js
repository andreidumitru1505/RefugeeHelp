import logo from './logo.svg';
import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Home from './components/Home';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ProfileSubmission from './components/ProfileSubmission';
import CheckExistingProfile from './components/CheckExistingProfile';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Home/>
      </header>
        <div className="content">
            <Routes>
                <Route exact path="/" element = {<CheckExistingProfile/>}/>
                <Route exact path="/home" element={<Home/>}/>
                <Route exact path="/profileSubmission" element={<ProfileSubmission/>}/>
            </Routes>
        </div>
    </div>
  );
}

export default App;
