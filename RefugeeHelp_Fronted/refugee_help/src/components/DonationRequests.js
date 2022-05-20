import {React, useEffect, useState} from 'react';
import {format} from 'react-string-format';


const DonationRequests = () => {
    const [isLoading, setIsLoading] = useState(1);
    const [requests, setRequests] = useState();

    useEffect(() => {

                fetch('http://localhost:8080/getDonationRequests')
                                    .then(response => response.json())
                                    .then(data => {setRequests(data); setIsLoading(0)})
        
    }, []);

    if(isLoading){
        return <div>Loading..</div>
    }
    else{
        return (
            <div>
                <div className="card mx-auto" style ={{backgroundColor: '#c4d6b0', padding: '15px', width: '35rem', marginTop: '3rem'}}>
                     <h5 class="card-title" style ={{marginBottom:'20px'}}> Donations </h5>
                     <div className = "accordion accordion-flush" id = "accordionFlushExample">
                         {
                             requests.slice(0,2).map((item) => ( 
                                 <div class="accordion-item">
                                     <h2 class="accordion-header" id="flush-headingOne">
                                     <button class="accordion-button collapsed" type="button" data-toggle="collapse" data-target={format('#{0}', item.requestId)} aria-expanded="false" aria-controls="flush-collapseOne">
                                     {item.description }
                                     </button>
                                     </h2>
                                     <div id={item.requestId} class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
                                     <div class="accordion-body">
                                     <p> Produs/Descriere: {item.description} </p>
                                     <p> Centru Donatii: {item.centerName} </p>
                                     <p> Cantitate Ceruta: {item.requestQuantity} </p>
                                     <p> Cantitate primita pana acum: {item.receivedQuantity} </p>
                                    {/* <Link to={format('/review/{0}', item.c_id)} state={{ 
                                         transporter: this.props.name, 
                                         client: item.username,
                                         dep_place: item.dep_place,
                                         arival_place: item.arival_place,
                                         pay_deadline: item.arival_max_date,
                                         myself: "Transporter",
                                         id: item.c_id,
                                         dep_date: item.dep_date,
                                         arival_date: item.arival_date,
                                         obs: item.obs
                                         }} className="btn btn-info font-weight-bold">Accept Offer</Link>*/}
                                     </div>
                                     </div>
                                 </div>
                             ))
                         }
                     </div>
                     </div>
                 {
                     requests.length > 2 ? (
                         <div className="card mx-auto" style ={{backgroundColor: '#c4d6b0', padding: '15px', width: '35rem', marginTop: '3rem'}}>
                             <h5 class="card-title" style ={{marginBottom:'20px'}}> Remaining Donations </h5>
                             <div className = "accordion accordion-flush" id = "accordionFlushExample">
                                 {
                                     requests.slice(2).map((item) => ( 
                                         <div class="accordion-item">
                                             <h2 class="accordion-header" id="flush-headingOne">
                                             <button class="accordion-button collapsed" type="button" data-toggle="collapse" data-target={format('#{0}', item.requestId)} aria-expanded="false" aria-controls="flush-collapseOne">
                                             {item.description }
                                             </button>
                                             </h2>
                                             <div id={item.requestId} class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
                                             <div class="accordion-body">
                                             <p> Produs/Descriere: {item.description} </p>
                                            <p> Centru Donatii: {item.centerName} </p>
                                            <p> Cantitate Ceruta: {item.requestQuantity} </p>
                                            <p> Cantitate primita pana acum: {item.receivedQuantity} </p>
                                            {/* <Link to={format('/review/{0}', item.c_id)} state={{ 
                                                 transporter: this.props.name, 
                                                 client: item.username,
                                                 dep_place: item.dep_place,
                                                 arival_place: item.arival_place,
                                                 pay_deadline: item.arival_max_date,
                                                 myself: "Transporter",
                                                 id: item.c_id,
                                                 dep_date: item.dep_date,
                                                 arival_date: item.arival_date,
                                                 obs: item.obs
                                                 }} className="btn btn-info font-weight-bold">Accept Offer</Link>*/}
                                             </div>
                                             </div>
                                         </div>
                                     ))
                                 }
                             </div>
                             </div>
                     ) : (
                         <></>
                     )
                 }
                
            </div>
         
     )
    }
}

export default DonationRequests;