import React, {useState} from 'react'
import ProfileSubmissionUser from './ProfileSubmissionUser';
import Home from './Home';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

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

    const [identityGuid, setIdentityGuid] = useState();
    const email = user.email;
    const [name, setName] = useState();
    const [registrationNumber, setRegistrationNumber] = useState();
    const [address, setAddress] = useState();
    const role="CENTER_ADMIN";
    const [changedRole, setChangedRole] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async e => {
      e.preventDefault();
          await register({
            identityGuid,
            email,
            name,
            registrationNumber,
            address,
            role
          });
          navigate("/home", {state:{email:email, name:name, registrationNumber:registrationNumber, address:address, role:role}});

  }

  if (changedRole == null){
    return (
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
                        <select id="inputState" class="form-select" defaultValue={"Center Administrator"} onChange={() => {setChangedRole("changed")}}>
                            <option>User</option>
                            <option>Center Administrator</option>
                        </select>
                        </div>
                    <form class="row g-3" onSubmit={handleSubmit}>
                        <div class="col-md-6">
                        <input type="text" class="form-control" id="1" placeholder="Identity Guid"  onChange={e => setIdentityGuid(e.target.value)}/>
                        </div>
                        <div class="col-md-6">
                        <input type="text" class="form-control" id="3" placeholder="Name" onChange={e => setName(e.target.value)}/>
                        </div>
                        <div class="col-md-6">
                        <input type="text" class="form-control" id="3" placeholder="Registration Number" onChange={e => setRegistrationNumber(e.target.value)}/>
                        </div>
                        <div class="col-md-6">
                        <input type="text" class="form-control" id="3" placeholder="Address" onChange={e => setAddress(e.target.value)}/>
                        </div>
                        <div class="col-12">
                        <button type="submit" class="btn btn-primary" style ={{backgroundColor:"#031d44", borderColor:"#031d44"}}>Submit Profile</button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
  }
  else{
    return <ProfileSubmissionUser/>;
  }
}

export default ProfileSubmissionCenter;