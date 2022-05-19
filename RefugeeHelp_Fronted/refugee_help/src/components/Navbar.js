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
                    <LogoutButton></LogoutButton>
                </div>
                <button onClick={() => navigate("/postRequest",
                {state:{email:props.email, name:props.name, registrationNumber:props.registrationNumber,
                    address:props.address, role:props.role, phoneNumber:props.phoneNumber}})}>
                    Add Request
                    </button>
                    </nav>)
        }
        return (            <>
            <nav className="navbar" >
                <div style={{display:'flex', flex:'1', alignItems:'flex-start'}}>    <h1 style = {{color: "#85BAA1", fontFamily: "fantasy"}}> logo </h1> </div>
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