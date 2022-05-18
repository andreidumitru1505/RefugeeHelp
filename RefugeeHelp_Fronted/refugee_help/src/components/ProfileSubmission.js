import React, {useState} from 'react'
import ProfileSubmissionCenter from './ProfileSubmissionCenter';
import ProfileSubmissionUser from './ProfileSubmissionUser';

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

const ProfileSubmission = () => {

  const [identityGuid, setIdentityGuid] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [reigstrationNumber, setRegistrationNumber] = useState();
  const [address, setAddress] = useState();
  const [role, setRole] = useState(null);
  
  const handleSubmit = async e => {
    e.preventDefault();
        const retBody = await register({
          identityGuid,
          email,
          name,
          reigstrationNumber,
          address,
          role
        });


}


    if (role == null){
        return (
                <div class = "container">
                <div class="row">
                        <div className="card shadow mb-1 mx-auto text-center" style={{ width: '10rem', maxHeight: '40rem', marginTop: '5%', backgroundColor: '#57abd1', alignContent:'center' }}>
                            <h5 class="card-title"> {name}  </h5>
                            <h6 class="card-subtitle mb-2 text-muted"> Transportator </h6>
                        </div>
                    <div class="row" style ={{ alignContent: 'center', marginTop: '5%'}}>               
                        <div className="card mx-auto" style ={{backgroundColor: '#57abd1', padding: '15px', width: '35rem'}}>
                        <h5 class="card-title" style ={{marginBottom:'20px'}}> Profile Submission Form </h5>
                            <form class="row g-3">
                                <div class="col-12">
                                <select id="inputState" class="form-select" onChange={e => setRole(e.target.value)}>
                                    <option selected>Profile Type</option>
                                    <option>User</option>
                                    <option>Center Administrator</option>
                                </select>
                                </div>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
        );
    }
    else if(role == "User") {
        return <ProfileSubmissionUser/>;
    }
    else{
        return <ProfileSubmissionCenter/>;
    }
};

export default ProfileSubmission;