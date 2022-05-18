const {validationResult} = require('express-validator');
const conn = require('../dbConn').promise();

exports.registerCenter = async(req,res,next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{
        const [newCenter] = await conn.execute(
            "INSERT INTO `centers` (`email`, `name`, `registrationNumber`, `address`, `phoneNumber`) VALUES (?,?,?,?,?)",[
                req.body.email,
                req.body.name,
                req.body.registrationNumber,
                req.body.address,
                req.body.phoneNumber
        ]);

        if(newCenter.affectedRows == 0){
            return res.status(422).json({
                message: "Failed to register center."
            })
        }
        else{
            return res.status(201).json({
                message: "Center registered!"
            })
        }
    }
    catch(err){
        next(err);
    }
}