import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <button style={{
            color: "white",
            backgroundColor: '#B24C63',
            borderRadius: '10px',
            borderWidth: '0px',
            padding:'7px',
            borderBottom: '1px',
            marginLeft: '10px',
            marginRight: '5px',
            fontFamily: "Quicksand",
            alignContent: 'center'
    
        }}onClick={() => logout({ returnTo: window.location.origin})}>
            Log Out
        </button>
    );
};

export default LogoutButton;