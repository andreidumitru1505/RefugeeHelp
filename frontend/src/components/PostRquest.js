import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

async function post(requestData) {
    return fetch('http://localhost:8080/postRequest',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    }).then(data => data.json())

}

const PostRequest = () => {

    const {state} = useLocation();
    const [type, setType] = useState();
    const centerEmail = state.email;
    const [description, setDescription] = useState();
    const [quantity, setQuantity] = useState();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const status = "NEW";

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            setError('');
            setSuccess('');
            await post({
                centerEmail,
                description,
                quantity,
                status,
                type
            });
            setSuccess("Request added successfully!");
        } catch (e) {
            setError(e.message);
        }
        

    }

    return(
        <div>
            <div>
                <Navbar email={state.email} name={state.name} registrationNumber={state.registrationNumber} role={state.role} address={state.address} phoneNumber={state.phoneNumber}/>
            </div>
        <div className="card shadow mb-4 mx-auto text-center" style ={{  width: '22rem', maxHeight: '40rem', marginTop: '5%', backgroundColor: '#BEEDAA',borderRadius:"10px"}}> 
                
        <div className="card-body">
                {/* <div className="card shadow mb-1 mx-auto text-center" style={{ width: '10rem', maxHeight: '40rem', marginTop: '5%', backgroundColor: '#57abd1', alignContent:'center' }}>
                    <h5 class="card-title"> {'name'}  </h5>
                    <h6 class="card-subtitle mb-2 text-muted"> Transportator </h6>
                </div> */}
           <h4 class="card-title mb-0 border-bottom font-weight-bold" style ={{marginBottom:'20px'}}> Add request </h4> 
           <p></p>
           <div style={{marginInline:"2.5rem", borderRadius:"10px"}}>
                
                    <p></p>
                   
                        <select style ={{borderRadius:"10px",  marginTop:"3rem"}}  id="inputState" class="form-select" defaultValue={"Type"} onChange={e => {setType(e.target.value)}}>
                            <option>Water</option>
                            <option>Clothes</option>
                            <option>Hygiene</option>
                            <option>Food</option>
                            <option>Transport</option>
                            <option>Toys</option>
                            <option>Books</option>
                        </select>
                      
                    <form  className='form-group' style={{ marginBottom:"8%"}} onSubmit={handleSubmit}>
                        <p></p>
                        <p></p>
                        <input  style ={{borderRadius:"10px", marginTop:"2rem"}}  type="text" class="form-control" id="1" placeholder="Description"  onChange={e => setDescription(e.target.value)}/>
                       
                        <p></p>
                      
                        <input  style ={{borderRadius:"10px", marginTop:"2rem"}}  type="text" class="form-control" id="3" placeholder="Quantity" onChange={e => setQuantity(e.target.value)}/>
                        
                       
                     
                        <button type="submit" class="btn btn-primary" style ={{backgroundColor:"#94AE89", borderColor:"#94AE89", fontFamily:"Quicksand", fontWeight:"bold", borderRadius:"5px", padding:"4px"}}>Add</button>
                        
                    </form>
                </div>
                </div>
            </div>

            {
                error && 
                <div>
                    <p>{error}</p>
                </div>
            }

            {
                success && 
                <div>
                    <div class="border border-dark" style={{ alignItems:"center", padding:"10px", marginInline:"42%", fontFamily:"Quicksand", borderRadius:"10px", color:'black' }}>{success}</div>
                </div>
            }
        </div>
      

    )

}

export default PostRequest;