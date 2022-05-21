const {validationResult} = require('express-validator');
const conn = require('../dbConn').promise();

exports.profileSubmission = async(req,res,next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        if(req.body.role == "CENTER_ADMIN"){
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
                    message: "Failed to submit center admin profile."
                })
            }
            else{
                return res.status(201).json({
                    message: "Profile submitted!"
                })
            }           
        }
        else if(req.body.role == "BASIC_USER"){
            const [newUser] = await conn.execute(
                "INSERT INTO `users` (`email`, `name`,`phoneNumber`) VALUES (?,?,?)",[
                    req.body.email,
                    req.body.name,
                    req.body.phoneNumber
            ]);
    
            if(newUser.affectedRows == 0){
                return res.status(422).json({
                    message: "Failed to submit basic user profile."
                })
            }
            else{
                return res.status(201).json({
                    message: "Profile submitted!"
                })
            }
        }
    }
    catch(err){
        next(err);
    }
}