import React, {useState} from 'react'
import ProfileSubmissionUser from './ProfileSubmissionUser';
import Home from './Home';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from './Navbar';

async function register(profileData) {
    return fetch('http://localhost:8080/profileSubmission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData)
    })
      .then(data => data.json())
   }
  
  const ProfileSubmissionCenter = () => {
    const {user} = useAuth0();

    const email = user.email;
    const [name, setName] = useState();
    const [registrationNumber, setRegistrationNumber] = useState();
    const [address, setAddress] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const role="CENTER_ADMIN";
    const [changedRole, setChangedRole] = useState(null);
    const navigate = useNavigate();
    const {state} = {email:email, name:name, registrationNumber:registrationNumber, address:address, role:role, phoneNumber:phoneNumber}

    const handleSubmit = async e => {
      e.preventDefault();
          await register({
            email,
            name,
            registrationNumber,
            address,
            phoneNumber,
            role
          });
          navigate("/home", {state:{email:email, name:name, registrationNumber:registrationNumber, address:address, role:role, phoneNumber:phoneNumber}});

  }

  if (changedRole == null){
    return (
        <div>
            <Navbar userInfo={state}/>
            {/* <div class = "container">
            <div class="row"> */}
                    {/* <div className="card shadow mb-1 mx-auto text-center" style={{ width: '10rem', maxHeight: '40rem', marginTop: '5%', backgroundColor: '#57abd1', alignContent:'center' }}>
                        <h5 class="card-title"> {name}  </h5>
                        <h6 class="card-subtitle mb-2 text-muted"> Transportator </h6>
                    </div> */}
                <div className="card shadow mb-4 mx-auto text-center" style ={{  width: '22rem', maxHeight: '40rem', marginTop: '5%', backgroundColor: '#BEEDAA',borderRadius:"10px"}}> 
                
                    <div className="card-body">
                    <h4 class="card-title mb-0 border-bottom font-weight-bold" style ={{marginBottom:'20px'}}> Setup profile </h4>
                    <div style={{marginInline:"2.5rem", borderRadius:"10px"}}>
                    <p></p>
                    <label>Role</label>
                            <select  style ={{borderRadius:"10px"}}  id="inputState" class="form-select" defaultValue={"Center Administrator"} onChange={() => {setChangedRole("changed")}}>
                                <option>User</option>
                                <option>Center Administrator</option>
                            </select>
                            </div>
                        <form className='form-group' style={{marginInline:"2.5rem", marginBottom:"8%"}} onSubmit={handleSubmit}>
                            <p></p>
                            <label>Name</label>
                            <input style ={{borderRadius:"10px"}}  type="text" class="form-control" id="3" placeholder="Name" onChange={e => setName(e.target.value)}/>
                          
                            <p></p>
                            <label>Registration Number</label>
                            <input style ={{borderRadius:"10px"}}  type="text" class="form-control" id="3" placeholder="Registration Number" onChange={e => setRegistrationNumber(e.target.value)}/>
                         
                            <p></p>
                            <label>Address</label>
                            <input style ={{borderRadius:"10px"}}  type="text" class="form-control" id="3" placeholder="Address" onChange={e => setAddress(e.target.value)}/>
                         
                            <p></p>
                            <label>Phone number</label>
                            <input style ={{borderRadius:"10px"}}  type="text" class="form-control" id="3" placeholder="Phone Number" onChange={e => setPhoneNumber(e.target.value)}/>
                          
                            <button type="submit" class="btn btn-primary" style ={{backgroundColor:"#94AE89", borderColor:"#94AE89", fontFamily:"Quicksand", fontWeight:"bold", borderRadius:"5px", padding:"4px"}}>Submit</button>
                           
                        </form>
                    </div>
                    {/* </div>
                </div> */}
            </div>
        </div>
    )
  }
  else{
    return (
        <div>
            <ProfileSubmissionUser/>
        </div>);
  }
}

export default ProfileSubmissionCenter;