import React from "react";
import { Navigate, useNavigate } from 'react-router-dom';

const HomeButton = (props) => {

    const navigate = useNavigate();

    return (
    <>
   <div className="homebutton">
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
    }} onClick={() => (navigate("/home", {state:{email:props.email, name:props.name, registrationNumber:props.registrationNumber,
                                        address:props.address, role:props.role, phoneNumber:props.phoneNumber}}))}> <a >Home</a></button>
    </div>
    </>
    )
};

export default HomeButton;