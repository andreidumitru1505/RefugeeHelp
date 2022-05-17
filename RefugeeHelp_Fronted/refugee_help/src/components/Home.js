import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

const Home = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    if (isLoading) {
        return <div>Loading</div>;
    }

    if(isAuthenticated){
        return <LogoutButton/>
    }
    else{
        return <LoginButton/>
    }
};

export default Home;
