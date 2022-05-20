const {validationResult} = require('express-validator');
const conn = require('../dbConn').promise();

exports.insertDonation = async(req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [objects] = await conn.execute(
            "SELECT * FROM `objects` WHERE `requestId`=?",[
                req.body.requestId
        ]);
        
        if(objects.length === 0){
            return res.status(422).json({
                message: "Failed inserting donation"
            })
        }

        const [types] = await conn.execute(
            "SELECT * FROM `types` WHERE `objectId`=?",[
                objects[0].objectId
        ]);

        if(types.length === 0){
            return res.status(422).json({
                message: "Failed inserting donation"
            })
        }

        const [users] = await conn.execute(
            "SELECT * FROM `users` WHERE `email`=?",[
                req.body.userEmail
        ]);

        if(users.length === 0){
            return res.status(422).json({
                message: "Failed inserting donation"
            })
        }

        const [donationsInsert] = await conn.execute(
            "INSERT INTO `donations` (`centerId`, `objectId`, `description`, `quantity`, `userId`) VALUES (?,?,?,?,?)",[
                req.body.centerId,
                objects[0].objectId,
                req.body.description,
                req.body.quantity,
                users[0].userId
        ]);

        if(donationsInsert.affectedRows === 0){
            return res.status(422).json({
                message: "Failed inserting donation"
            })
        }

        if(types[0].requestQuantity - types[0].receivedQuantity < req.body.quantity){
            const [objectDonatedUpdate] = await conn.execute(
                "UPDATE `objects` SET `isDonated` = true WHERE `objectId`=?",[
                    objects[0].objectId
            ]);

            if(objectDonatedUpdate.affectedRows === 0){
                return res.status(422).json({
                    message: "Failed inserting donation"
                })
            }
        }

        const [typesUpdate] = await conn.execute(
            "UPDATE `types` SET `receivedQuantity`=? WHERE `objectId`=?",[
                req.body.quantity + types[0].receivedQuantity,
                objects[0].objectId
        ]);

        if(typesUpdate.affectedRows === 0){
            return res.status(422).json({
                message: "Failed inserting donation"
            })
        }

        return res.status(201).json({
            message: "Donation inserted succesfully!"
        })

    }
    catch(err){
        next(err);
    }



}