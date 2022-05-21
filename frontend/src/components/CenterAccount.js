import { useLocation } from "react-router-dom";
import {useState, useEffect} from "react";
import Navbar from './Navbar';
import {format} from 'react-string-format';

const CenterAccount = () => {
    
    const [incompleteRequests, setIncompleteRequests] = useState();
    const [completeRequests, setCompleteRequests] = useState();
    const {state} = useLocation();
    const dummy = 'dummy';
    const email = state.email;
    const [isCompleteRequestsLoading, setIsCompleteRequestsLoading] = useState(1);
    const [isIncompleteRequestsLoading, setIsIncompleteRequestsLoading] = useState(1);

    console.log(state);

    useEffect(() => {
        fetch('http://localhost:8080/getRequestsByCenter',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, dummy})
        })
            .then(response => response.json())
            .then(data => {setIncompleteRequests(data); setIsIncompleteRequestsLoading(0)});

        fetch('http://localhost:8080/getCompletedRequestsByCenter',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, dummy})
        })
            .then(response => response.json())
            .then(data => {setCompleteRequests(data); setIsCompleteRequestsLoading(0)});
    },[])


    if(isCompleteRequestsLoading || isIncompleteRequestsLoading){
        return <div>Loading...</div>
    }
    else{
        return (
            <div>
                <div>
                    <div>
                        <Navbar email={state.email} name={state.name} registrationNumber={state.registrationNumber} role={state.role} address={state.address} phoneNumber={state.phoneNumber}/>
                    </div>
                    <div className="card mx-auto" style ={{backgroundColor: '#c4d6b0', padding: '15px', width: '35rem', marginTop: '3rem'}}>
                        <h5 class="card-title" style ={{marginBottom:'20px'}}> Donations </h5>
                        <div className = "accordion accordion-flush" id = "accordionFlushExample">
                            {
                                incompleteRequests.slice(0,2).map((item) => ( 
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="flush-headingOne">
                                        <button class="accordion-button collapsed" type="button" data-toggle="collapse" data-target={format('#{0}', item.requestId)} aria-expanded="false" aria-controls="flush-collapseOne">
                                        {item.description }
                                        </button>
                                        </h2>
                                        <div id={item.requestId} class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
                                        <div class="accordion-body">
                                        <p> Produs/Descriere: {item.description} </p>
                                        <p> Cantitate ceruta: {item.requestQuantity} </p>
                                        <p> Cantitate primita: {item.receivedQuantity} </p>
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
                        incompleteRequests.length > 2 ? (
                            <div className="card mx-auto" style ={{backgroundColor: '#c4d6b0', padding: '15px', width: '35rem', marginTop: '3rem'}}>
                                <h5 class="card-title" style ={{marginBottom:'20px'}}> Remaining Requests </h5>
                                <div className = "accordion accordion-flush" id = "accordionFlushExample">
                                    {
                                        incompleteRequests.slice(2).map((item) => ( 
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="flush-headingOne">
                                                <button class="accordion-button collapsed" type="button" data-toggle="collapse" data-target={format('#{0}', item.requestId)} aria-expanded="false" aria-controls="flush-collapseOne">
                                                {item.description }
                                                </button>
                                                </h2>
                                                <div id={item.requestId} class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
                                                <div class="accordion-body">
                                                <p> Produs/Descriere: {item.description} </p>
                                                <p> Cantitate ceruta: {item.requestQuantity} </p>
                                                <p> Cantitate primita: {item.receivedQuantity} </p>
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
                <div>
                    <div className="card mx-auto" style ={{backgroundColor: '#c4d6b0', padding: '15px', width: '35rem', marginTop: '3rem'}}>
                        <h5 class="card-title" style ={{marginBottom:'20px'}}> Requesturi complete </h5>
                        <div className = "accordion accordion-flush" id = "accordionFlushExample">
                            {
                                completeRequests.slice(0,2).map((item) => ( 
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="flush-headingOne">
                                        <button class="accordion-button collapsed" type="button" data-toggle="collapse" data-target={format('#{0}', item.requestId)} aria-expanded="false" aria-controls="flush-collapseOne">
                                        {item.description }
                                        </button>
                                        </h2>
                                        <div id={item.requestId} class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
                                        <div class="accordion-body">
                                        <p> Produs/Descriere: {item.description} </p>
                                        <p> Cantitate ceruta: {item.requestQuantity} </p>
                                        <p> Cantitate primita: {item.receivedQuantity} </p>
                                        <p> Users: {item.users}</p>
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
                        completeRequests.length > 2 ? (
                            <div className="card mx-auto" style ={{backgroundColor: '#c4d6b0', padding: '15px', width: '35rem', marginTop: '3rem'}}>
                                <h5 class="card-title" style ={{marginBottom:'20px'}}> Remaining Requests </h5>
                                <div className = "accordion accordion-flush" id = "accordionFlushExample">
                                    {
                                        completeRequests.slice(2).map((item) => ( 
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="flush-headingOne">
                                                <button class="accordion-button collapsed" type="button" data-toggle="collapse" data-target={format('#{0}', item.requestId)} aria-expanded="false" aria-controls="flush-collapseOne">
                                                {item.description }
                                                </button>
                                                </h2>
                                                <div id={item.requestId} class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
                                                <div class="accordion-body">
                                                <p> Produs/Descriere: {item.description} </p>
                                                <p> Cantitate ceruta: {item.requestQuantity} </p>
                                                <p> Cantitate primita: {item.receivedQuantity} </p>
                                                <p> Users: {item.users}</p>
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
            </div>
        )          
    }
}

export default CenterAccount;