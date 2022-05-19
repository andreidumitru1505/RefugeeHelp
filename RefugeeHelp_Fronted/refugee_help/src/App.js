import logo from './logo.svg';
import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Home from './components/Home';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ProfileSubmission from './components/ProfileSubmission';
import CheckExistingProfile from './components/CheckExistingProfile';
import PostRequest from './components/PostRquest';
import Navbar from './components/Navbar';

function App() {

  return (
    <div className="App">
        <div className="content">
            <Routes>
                <Route exact path="/" element = {<CheckExistingProfile/>}/>
                <Route exact path="/home" element={<Home/>}/>
                <Route exact path="/profileSubmission" element={<ProfileSubmission/>}/>
                <Route exact path="/postRequest" element={<PostRequest/>}/>
            </Routes>
        </div>
    </div>
  );
}

export default App;
