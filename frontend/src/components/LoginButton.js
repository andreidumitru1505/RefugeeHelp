import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {

    const { loginWithRedirect } = useAuth0();

    return (
    <>
   <div className="loginbutton">
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

    }}  onClick={() => loginWithRedirect()}> <a >Login</a></button>
    </div>
    </>
    )
};

export default LoginButton;