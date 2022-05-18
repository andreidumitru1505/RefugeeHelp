import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Home = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const {state} = useLocation();
    const navigate = useNavigate();

    if (isLoading) {
        return <div>Loading</div>;
    }

    if(isAuthenticated){
        
        return (<div>
                    <LogoutButton/>
                    <button onClick={() => navigate("/postRequest",
                                                    {state:{email:state.email, name:state.name, registrationNumber:state.registrationNumber,
                                                            address:state.address, role:state.role, phoneNumber:state.phoneNumber}})}>
                            Add Request
                    </button>;
                </div>)

    }
    else{
        return <LoginButton/>
    }

};

export default Home;
