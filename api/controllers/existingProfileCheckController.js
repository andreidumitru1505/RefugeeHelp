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

        found = null;
        if(centerSearch.length !== 0){
            found = centerSearch;
        }
        else if(userSearch.length !== 0){
            found = userSearch;
        }
        if(found === null){
            return res.status(201).json({
                message: "NOT_EXISTING"
            })
        }
        else{
            res.contentType('application/json');
            return res.send(JSON.stringify(found));
        }
    }
    catch(err){
        next(err);
    }
}