const {validationResult} = require('express-validator');
const conn = require('../dbConn').promise();

exports.postRequest = async(req,res,next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [center] = await conn.execute(
            "SELECT `centerId` FROM `centers` WHERE `email`=?",[
                req.body.centerEmail
            ]);

        console.log('2');
        if(center.length === 0){
            return res.status(422).json({
                message: "Center not found."
            })
        }

        const [newRequest] = await conn.execute(
            "INSERT INTO `requests` (`centerId`, `description`, `quantity`,`status`) VALUES (?,?,?,?)",[
                center[0].centerId,
                req.body.description,
                req.body.quantity,
                req.body.status
        ]);

        console.log(newRequest);

        const [newObject] = await conn.execute(
            "INSERT INTO `objects` (requestId, isTransport, isDonated) VALUES (?,?,?)",[
                newRequest.insertId,
                req.body.type === 'Transport',
                false
        ]);

        const [newType] = await conn.execute(
            "INSERT INTO `types`(objectId, type, description, requestQuantity, receivedQuantity) VALUES (?,?,?,?,?)", [
                newObject.insertId,
                req.body.type,
                req.body.description,
                req.body.quantity,
                0
            ]);

        
        if(newRequest.affectedRows == 0){
            return res.status(422).json({
                message: "Failed to post request."
            })
        }
        else{
            return res.status(201).json({
                message: "Request posted!"
            })
        }
    }
    catch(err){
        next(err);
    }
}

exports.getDonationRequests = async(req, res, next) => {

    try{
 
        const [requests] = await conn.execute('SELECT * FROM `requests`');
        var response = [];

        for(var i = 0; i < requests.length; i++){
            const [objects] = await conn.execute(
                "SELECT * FROM objects WHERE (`isTransport` = 0 AND `requestId`=?)",[
                    requests[i].requestId
            ]);

            if (objects.length === 0 || objects[0].isDonated === 1){
                continue;
            }

            const [types] = await conn.execute(
                "SELECT * FROM types WHERE `objectId`=?",[
                    objects[0].objectId
            ]);

            if(types.length === 0){
                continue;
            }

            const [centers] = await conn.execute(
                "SELECT * FROM centers WHERE `centerId`=?",[
                    requests[i].centerId
            ]);

            response.push( {
                centerId: centers[0].centerId,
                requestId: requests[i].requestId,
                centerName: centers[0].name,
                description: requests[i].description,
                requestQuantity: types[0].requestQuantity,
                receivedQuantity: types[0].receivedQuantity
            });

        }
        res.contentType('application/json');
        return res.send(JSON.stringify(response));  
    }
    catch(err){
        next(err);
    }
}

exports.getTransportRequests = async(req, res, next) => {

    try{
 
        const [requests] = await conn.execute('SELECT * FROM `requests`');
        var response = [];

        for(var i = 0; i < requests.length; i++){
            const [objects] = await conn.execute(
                "SELECT * FROM objects WHERE (`isTransport` = 1 AND `requestId`=?)",[
                    requests[i].requestId
            ]);

            if (objects.length === 0 || objects[0].isDonated === 1){
                continue;
            }

            const [types] = await conn.execute(
                "SELECT * FROM types WHERE `objectId`=?",[
                    objects[0].objectId
            ]);

            if(types.length === 0){
                continue;
            }

            const [centers] = await conn.execute(
                "SELECT * FROM centers WHERE `centerId`=?",[
                    requests[i].centerId
            ]);

            response.push( {
                centerId: centers[0].centerId,
                requestId: requests[i].requestId,
                centerName: centers[0].name,
                description: requests[i].description,
                requestQuantity: types[0].requestQuantity,
                receivedQuantity: types[0].receivedQuantity
            });

        }
        res.contentType('application/json');
        return res.send(JSON.stringify(response));  
    }
    catch(err){
        next(err);
    }
}