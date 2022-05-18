import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import ProfileSubmission from "./ProfileSubmission";
import Home from "./Home";
import { Navigate, useNavigate } from "react-router-dom";

const CheckExistingProfile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [response, setResponse] = useState();

    const navigate = useNavigate();
    useEffect(() => {
        
        const checkExisting = async () => {
            const email = user.email;
            const dummy = 'dummy';

           const res = await fetch('http://localhost:8080/existingProfileCheck',{
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({email, dummy})
           }).then(data => data.json())

           setResponse(res);
        }

        if(isAuthenticated){
          checkExisting();
        }
      })

 
    if(isLoading)
        return <div>Loading...</div>

    if (typeof response !== 'undefined'){
        if(!isAuthenticated){
            navigate("/home", {state:{email:'INVALID', name:'INVALID', registrationNumber:'INVALID', address:'INVALID',
                                    role: 'INVALID', phoneNumber: 'INVALID'}});
            return <Home/>;
        }
        else if (isAuthenticated && response.hasOwnProperty('message')){
            navigate("/profileSubmission")
            return <ProfileSubmission/>;
        }
        else {
            if(response[0].hasOwnProperty('registrationNumber')){
                navigate("/home", {state:{email:response[0].email, name:response[0].name,
                                        registrationNumber:response[0].registrationNumber, address:response[0].address,
                                        role: 'CENTER_ADMIN', phoneNumber:response[0].phoneNumber}});

            }
            else{
                navigate("/home", {state:{email:response[0].email, name:response[0].name,
                                        registrationNumber:'INVALID', address:'INVALID', role: 'BASIC_USER', phoneNumber:response[0].phoneNumber}});
            }
            return <Home/>;
        }
    }
};

export default CheckExistingProfile;