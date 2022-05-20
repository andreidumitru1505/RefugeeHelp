import React, {useState} from 'react'
import Navbar from './Navbar';
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

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [reigstrationNumber, setRegistrationNumber] = useState();
  const [address, setAddress] = useState();
  const [role, setRole] = useState(null);
  
  const handleSubmit = async e => {
    e.preventDefault();
        const retBody = await register({
          email,
          name,
          reigstrationNumber,
          address,
          role
        });

    }

    const userInfo={}

    if (role == null){
        return (
                <div>
                    <Navbar userInfo={null} />
                  
                            {/* <div className="card shadow mb-1 mx-auto text-center" style={{ width: '10rem', maxHeight: '40rem', marginTop: '5%', backgroundColor: '#57abd1', alignContent:'center' }}>
                                <h5 class="card-title"> {name}  </h5>
                                <h6 class="card-subtitle mb-2 text-muted"> Transportator </h6>
                            </div> */}
                        <div className="card shadow mb-4 mx-auto text-center" style ={{  width: '22rem', maxHeight: '40rem', marginTop: '5%', backgroundColor: '#BEEDAA',borderRadius:"10px"}}>               
                        <div className="card-body">
                            <h4 className="card-title mb-0 border-bottom font-weight-bold" > Setup profile</h4>
                        </div>
                                {/* <form class="row g-3">
                                    <div class="col-12">
                                    <select id="inputState" class="form-select" onChange={e => setRole(e.target.value)}>
                                        <option selected>Profile Type</option>
                                        <option>User</option>
                                        <option>Center Administrator</option>
                                    </select>
                                    </div>
                                </form> */}
                                
                                    <div className='form-group'  style={{marginInline:"2.5rem", marginBottom:"8%"}}>
                                        <label>Role</label>
                                               
            
                                        <select class="form-select" style ={{borderRadius:"10px"}}onChange={e => setRole(e.target.value)}>
                                        <option selected>Profile type</option>
                                        <option value="User">User</option>
                                        <option value="Center Administrator">Center Administrator</option>
                                        </select>
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