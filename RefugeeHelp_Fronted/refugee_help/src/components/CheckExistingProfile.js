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

           setResponse(res.message);

        }

        if(isAuthenticated){
          checkExisting();
        }
      })

 
    if(isLoading)
        return <div>Loading...</div>

    if (typeof response !== 'undefined'){
        if(!isAuthenticated){
            navigate("/home");
            return <Home/>;
        }
        else if (isAuthenticated && response === 'EXISTING'){
            navigate("/home");
            return <Home/>;
        }
        else{
            navigate("/profileSubmission")
            return <ProfileSubmission/>;
        }
    }
};

export default CheckExistingProfile;