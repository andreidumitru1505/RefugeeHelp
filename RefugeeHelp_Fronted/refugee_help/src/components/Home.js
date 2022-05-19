import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import img from '../home.png'

const Home = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const {state} = useLocation();
    const navigate = useNavigate();


    if (isLoading) {
        return <div>Loading</div>;
    }
    console.log(state);
    return (
    <>
        <div>
            <Navbar email={state.email} name={state.name} registrationNumber={state.registrationNumber} role={state.role} address={state.address} phoneNumber={state.phoneNumber}/>
            </div>
            <div style={{maxWidth: "54px"}}>  </div>
        <div style ={{display: "flex", justifyContent:"center",alignItems: "center",marginTop:"50px"}}> 
        
            <img className="img" src={img}  style ={{display: "block", display: "flex", justifyContent:"center", alignItems: "center", margin: " 0 auto", borderRadius: "20px"}} />
            </div>   
        
    </>
    )
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
