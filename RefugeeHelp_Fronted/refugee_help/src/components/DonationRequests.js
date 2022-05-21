import {React, useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import {format} from 'react-string-format';
import Navbar from './Navbar';
import img from '../donation.png'
import img2 from '../transport.png'

const DonationRequests = () => {
    const [isLoading, setIsLoading] = useState(1);
    const [isTransportLoading, setIsTransportLoading] = useState(1);
    const [requests, setRequests] = useState();
    const [transportRequests, setTransportRequests] = useState();
    const state = useLocation();
    const [viewDonations, setViewDonations] = useState(1);

    useEffect(() => {

                fetch('http://localhost:8080/getDonationRequests')
                                    .then(response => response.json())
                                    .then(data => {setRequests(data); setIsLoading(0)})
                fetch('http://localhost:8080/getTransportRequests')
                                    .then(response => response.json())
                                    .then(data => {setTransportRequests(data); setIsTransportLoading(0)})
        
    }, []);

    if(isLoading || isTransportLoading){
        return <div>Loading..</div>
    }
    else{

        if (viewDonations){
            return (
                <div>
                    <div>
                        <Navbar email={state.email} name={state.name} registrationNumber={state.registrationNumber} role={state.role} address={state.address} phoneNumber={state.phoneNumber}/>
                    </div>
                    
                    <div style ={{marginInline:"20%"}}>
                        <div className="card mx-auto" style ={{backgroundColor: '#D5FFD9',padding: '15px', marginTop: '3rem', borderRadius:"5px",borderWidth:"0rem"}}>
                            <div class="row">
                                <div class="col" >
                                        
                                            <h5 class="card-title" style ={{marginBottom:'20px', fontFamily:"Quicksand", fontWeight:"bold", marginBottom:"20%", marginTop:"5%"}}> Donate something </h5>
                                        
                                                {
                                                    requests.map((item) => ( 
                                                        <ol class="list-group ">
                                                        <li class="list-group-item d-flex justify-content-between align-items-start" key = {item.requestId} style ={{borderRadius:"5px",borderWidth:"0rem", backgroundColor: '#BEEDAA', marginBottom:"5%", marginInline:"10%"}}>
                                                            <div class="col">
                                                            <div class="ms-2 me-auto" style={{textAlign:"left", fontFamily:"Quicksand", fontWeight:"700"}}>
                                                                    <b> {item.description}  <br></br> </b>
                                                                    <b> Quantity:  {item.receivedQuantity}/{item.requestQuantity}  <br></br> </b>
                                                                    <b> Center:  {item.centerName}<br></br> </b>
                                                                 
                                                            
                                                        
                                                            </div>
                                                            
                                                            </div>
                                                            <div class="col" style = {{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                                                <button type="submit" class="btn btn-primary" style ={{alignItems:"center", backgroundColor:"#B24C63", borderColor:"#94AE89", 
                                                                fontFamily:"Quicksand", fontWeight:"bold",fontStyle:"normal", borderRadius:"5px", padding:"12px", marginBlock:"15%"}}>Donate</button>
                                                            </div>
                                                                
                                                    
                                                        </li>
                                                        
                                                    </ol>
                                                    ))
                                                }
                                            
                                </div>
                                <div class="col" > 
                                
                                    <div style ={{marginBottom:"20%"}}>
                                    <button style={{ border:"0rem", background:'transparent'}} onClick={() => setViewDonations(0)}> <h5 style={{fontFamily:"Quicksand", fontWeight:"bold",  marginTop:"8%"}}>Transport donations</h5></button>
                                    </div>
                                     <div style ={{}}><img className="img" src={img}  style ={{border: "1px solid #94AE89", textAlign:"center", maxWidth:"28rem", marginRight:"3rem"}} /> </div>
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
                    <div>
                        <Navbar email={state.email} name={state.name} registrationNumber={state.registrationNumber} role={state.role} address={state.address} phoneNumber={state.phoneNumber}/>
                    </div>
                    
                    <div style ={{marginInline:"20%"}}>
                        <div className="card mx-auto" style ={{backgroundColor: '#D5FFD9',padding: '15px', marginTop: '3rem', borderRadius:"5px",borderWidth:"0rem"}}>
                            <div class="row">
                            <div class="col" > 
                                
                                <div style ={{marginBottom:"20%"}}>
                                <button style={{ border:"0rem", background:'transparent'}} onClick={() => setViewDonations(1)}> <h5 style={{fontFamily:"Quicksand", fontWeight:"bold",  marginTop:"8%"}}>Donate something</h5></button>
                                </div>
                                 <div style ={{}}><img className="img" src={img2}  style ={{border: "1px solid #94AE89", textAlign:"center", maxWidth:"28rem", marginLeft:"3rem", maxWidth:"25rem", marginBottom:"5%"}} /> </div>
                            </div>
                                <div class="col" >
                                        
                                            <h5 class="card-title" style ={{marginBottom:'20px', fontFamily:"Quicksand", fontWeight:"bold", marginBottom:"20%", marginTop:"5%"}}> Transport donations </h5>
                                        
                                                {
                                                    transportRequests.map((item) => ( 
                                                        <ol class="list-group ">
                                                        <li class="list-group-item d-flex justify-content-between align-items-start" key = {item.requestId} style ={{borderRadius:"5px",borderWidth:"0rem", backgroundColor: '#BEEDAA', marginBottom:"5%", marginInline:"10%"}}>
                                                            <div class="col">
                                                            <div class="ms-2 me-auto" style={{textAlign:"left", fontFamily:"Quicksand", fontWeight:"700"}}>
                                                                    <b> Transport {item.requestId} <br></br> </b>
                                                                    <b> Description: {item.description}  <br></br> </b>
                                                                    <b> Route:  {item.centerName}<br></br> </b>
                                                                 
                                                            
                                                        
                                                            </div>
                                                            
                                                            </div>
                                                            <div class="col" style = {{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                                                <button type="submit" class="btn btn-primary" style ={{alignItems:"center", backgroundColor:"#B24C63", borderColor:"#94AE89", 
                                                                fontFamily:"Quicksand", fontWeight:"bold",fontStyle:"normal", borderRadius:"5px", padding:"12px", marginBlock:"15%"}}>Transport</button>
                                                            </div>
                                                                
                                                    
                                                        </li>
                                                        
                                                    </ol>
                                                    ))
                                                }
                                            
                                </div>
                              
                            </div> 
                        </div>
                    </div>
                    
                </div>
            )
        }
    }
}

export default DonationRequests;