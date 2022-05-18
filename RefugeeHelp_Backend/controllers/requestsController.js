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