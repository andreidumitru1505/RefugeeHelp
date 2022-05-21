import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ProfileSubmission from './components/ProfileSubmission';
import CheckExistingProfile from './components/CheckExistingProfile';
import PostRequest from './components/PostRquest';
import Navbar from './components/Navbar';
import DonationRequests from './components/DonationRequests';
import UserAccount from './components/UserAccount';
import CenterAccount from './components/CenterAccount';

function App() {

  return (
    <div className="App">
        <div className="content">
            <Routes>
                <Route exact path="/" element = {<CheckExistingProfile/>}/>
                <Route exact path="/home" element={<Home/>}/>
                <Route exact path="/profileSubmission" element={<ProfileSubmission/>}/>
                <Route exact path="/postRequest" element={<PostRequest/>}/>
                <Route exact path="/donations" element={<DonationRequests/>}/>
                <Route exact path="/userAccount" element={<UserAccount/>}/>
                <Route exact path="/centerAccount" element={<CenterAccount/>}/>
            </Routes>
        </div>
    </div>
  );
}

export default App;
