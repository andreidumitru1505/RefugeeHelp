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
            <div class="row">
                    <div className="card shadow mb-1 mx-auto text-center" style={{ width: '10rem', maxHeight: '40rem', marginTop: '5%', backgroundColor: '#57abd1', alignContent:'center' }}>
                        <h5 class="card-title"> {name}  </h5>
                        <h6 class="card-subtitle mb-2 text-muted"> Transportator </h6>
                    </div>
                <div class="row" style ={{ alignContent: 'center', marginTop: '5%'}}> 
                
                    <div className="card mx-auto" style ={{backgroundColor: '#57abd1', padding: '15px', width: '35rem'}}>
                    <h5 class="card-title" style ={{marginBottom:'20px'}}> Inregistrare oferta </h5>
                        <div class="col-12">
                            <select id="inputState" class="form-select" defaultValue={"User"} onChange={() => { setChangedRole("changed") }}>
                                <option>User</option>
                                <option>Center Administrator</option>
                            </select>
                        </div>
                        <form class="row g-3" onSubmit={handleSubmit}>
                            <div class="col-md-6">
                            <input type="text" class="form-control" id="3" placeholder="Name" onChange={e => setName(e.target.value)}/>
                            </div>
                            <div class="col-md-6">
                            <input type="text" class="form-control" id="3" placeholder="Phone Number" onChange={e => setPhoneNumber(e.target.value)}/>
                            </div>
                            <div class="col-12">
                            <button type="submit" class="btn btn-primary" style ={{backgroundColor:"#031d44", borderColor:"#031d44"}}>Submit Profile</button>
                            </div>
                        </form>
                    </div>
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