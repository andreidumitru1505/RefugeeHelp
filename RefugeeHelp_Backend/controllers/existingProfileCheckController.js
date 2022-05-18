const {validationResult} = require('express-validator');
const conn = require('../dbConn').promise();

exports.existingProfileCheck = async(req,res,next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{
        const [centerSearch] = await conn.execute(
            "SELECT * FROM `centers` WHERE email=?",[
                req.body.email
        ]);
        const [userSearch] = await conn.execute(
            "SELECT * FROM `users` WHERE email=?",[
                req.body.email
        ]);

        if(centerSearch.length === 0 && userSearch.length === 0){
            return res.status(201).json({
                message: "NOT_EXISTING"
            })
        }
        else{
            return res.status(201).json({
                message: "EXISTING"
            })
        }
    }
    catch(err){
        next(err);
    }
}