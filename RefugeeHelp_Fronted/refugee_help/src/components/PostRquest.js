import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';

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
    const status = "NEW";

    const handleSubmit = async e => {
        e.preventDefault();
        await post({
            centerEmail,
            description,
            quantity,
            status,
            type
        });

    }

    return(
        <div class = "container">
        <div class="row">
                <div className="card shadow mb-1 mx-auto text-center" style={{ width: '10rem', maxHeight: '40rem', marginTop: '5%', backgroundColor: '#57abd1', alignContent:'center' }}>
                    <h5 class="card-title"> {'name'}  </h5>
                    <h6 class="card-subtitle mb-2 text-muted"> Transportator </h6>
                </div>
            <div class="row" style ={{ alignContent: 'center', marginTop: '5%'}}> 
            
                <div className="card mx-auto" style ={{backgroundColor: '#57abd1', padding: '15px', width: '35rem'}}>
                <h5 class="card-title" style ={{marginBottom:'20px'}}> Inregistrare oferta </h5>
                <div class="col-12">
                        <select id="inputState" class="form-select" defaultValue={"Type"} onChange={e => {setType(e.target.value)}}>
                            <option>Water</option>
                            <option>Clothes</option>
                            <option>Hygiene</option>
                            <option>Hygiene</option>
                        </select>
                        </div>
                    <form class="row g-3" onSubmit={handleSubmit}>
                        <div class="col-md-6">
                        <input type="text" class="form-control" id="1" placeholder="Description"  onChange={e => setDescription(e.target.value)}/>
                        </div>
                        <div class="col-md-6">
                        <input type="text" class="form-control" id="3" placeholder="Quantity" onChange={e => setQuantity(e.target.value)}/>
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

export default PostRequest;