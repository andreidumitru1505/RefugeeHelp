import React, {useState} from 'react'
import ProfileSubmissionCenter from './ProfileSubmissionCenter';
import Home from './Home';
import { useNavigate } from 'react-router-dom';
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
  
  const ProfileSubmissionUser = () => {
  
    const {user} = useAuth0();

    const email = user.email;
    const [name, setName] = useState();
    const [registrationNumber, setRegistrationNumber] = useState("PLACEHOLDER");
    const [address, setAddress] = useState("PLACEHOLDER");
    const [phoneNumber, setPhoneNumber] = useState();
    const role="BASIC_USER";
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
          navigate('/home', {state:{email:email, name: name, registrationNumber:'INVALID', address:'INVALID', role: role, phoneNumber:phoneNumber}});
  }

  if(changedRole == null){
    return (
        <div>
        <Navbar userInfo={state}/>
            <div class = "container">
            
                    {/* PT NUME USER <div className="card shadow mb-1 mx-auto text-center" style={{ width: '10rem', maxHeight: '40rem', marginTop: '5%', backgroundColor: '#BEEDAA',borderRadius:"10px", alignContent:'center' }}>
                        <h5 class="card-title"> {name}  </h5>
                        <h6 class="card-subtitle mb-2 text-muted"> Transportator </h6>
                    </div> */}
                <div  style ={{ alignContent: 'center', marginTop: '5%'}}> 
                
                    <div className="card shadow mb-4 mx-auto text-center" style ={{  width: '22rem', maxHeight: '40rem', marginTop: '5%', backgroundColor: '#BEEDAA',borderRadius:"10px"}}>   
                    <div className="card-body">
                    <h4 class="card-title mb-0 border-bottom font-weight-bold" style ={{marginBottom:'20px'}}> Setup profile </h4>
                        </div>
                        <div style={{marginInline:"2.5rem", borderRadius:"10px"}} >
                        <label>Role</label>
                            <select style ={{borderRadius:"10px"}} id="inputState" class="form-select" defaultValue={"User"} onChange={() => { setChangedRole("changed") }}>
                                <option>User</option>
                                <option>Center Administrator</option>
                            </select>
                            </div>
                        <form className='form-group' style={{marginInline:"2.5rem", marginBottom:"8%"}} onSubmit={handleSubmit} >
                          
                            
                              <p></p>
                            <label>Name</label>
                            <input style ={{borderRadius:"10px"}} type="text" class="form-control" id="3" placeholder="Name" onChange={e => setName(e.target.value)}/>
                            
                            
                            
                            <p></p>
                            <label>Phone number</label>
                            <input style ={{borderRadius:"10px"}} type="text" class="form-control" id="3" placeholder="Phone Number" onChange={e => setPhoneNumber(e.target.value)}/>
                            
                           
                            <button class="btn btn-primary"  style ={{backgroundColor:"#94AE89", borderColor:"#94AE89", fontFamily:"Quicksand", fontWeight:"bold", borderRadius:"5px", padding:"4px"}}>Submit</button>
                            
                       
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
  }
  else{
    return (
        <div>
            <ProfileSubmissionCenter/>
        </div>);
  }
}

export default ProfileSubmissionUser;