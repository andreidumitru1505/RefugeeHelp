import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import HomeButton from "./HomeButton";
import './Navbar.css';
import { useNavigate } from "react-router-dom";
import img from '../logo.png'


const Navbar = (props) => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();

    if(isAuthenticated){
        if(props.role !== null && props.role == 'CENTER_ADMIN'){
            return (
                <nav className="navbar" >
                <div style={{display:'flex', flex:'1', alignItems:'flex-start'}}>   
                <img className="img" src={img} style ={{maxWidth:'8rem', marginTop:'0rem'}} /> </div>
                <div style={{display:'flex', flexDirection:'row', alignItems:'flex-end'}}>
                    <HomeButton></HomeButton>
                 
                </div>
                <button  style={{
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

    }} onClick={() => navigate("/postRequest",
                {state:{email:props.email, name:props.name, registrationNumber:props.registrationNumber,
                    address:props.address, role:props.role, phoneNumber:props.phoneNumber}})}>
                    Add request
                    </button>
                    <LogoutButton></LogoutButton>
                    </nav>)
        }
        
        return (            <>
            <nav className="navbar" >
                <div style={{display:'flex', flex:'1', alignItems:'flex-start'}}>   
                <img className="img" src={img} style ={{maxWidth:'8rem', marginTop:'0rem'}} /> </div>
                <div style={{display:'flex', flexDirection:'row', alignItems:'flex-end'}}>
                    <HomeButton></HomeButton>
                    <LogoutButton></LogoutButton>
                </div>
            </nav>
        </> )
    }
    else{
        return ( 
            <>
                <nav className="navbar" >
                    <div style={{display:'flex', flex:'1', alignItems:'flex-start'}}>     
                     <img className="img" src={img} style ={{maxWidth:'8rem', marginTop:'0rem'}} /> </div>
                    <div style={{display:'flex', flexDirection:'row', alignItems:'flex-end'}}>
                        <HomeButton></HomeButton>
                        <LoginButton></LoginButton>
                    </div>
                </nav>
            </>
    
        )
    }
    }
export default Navbar;