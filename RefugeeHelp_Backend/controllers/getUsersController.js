const conn = require('../dbConn').promise();

exports.getUsers = async (req,res,next) => {

    try{
 
        const [rows] = await conn.execute('SELECT * FROM `users`');
        res.contentType('application/json');
        return res.send(JSON.stringify(rows));  
    }
    catch(err){
        next(err);
    }
}

exports.getUsersDonations = async (req,res,next) => {
    try{
        const [users] = await conn.execute("SELECT * FROM users WHERE `email`=?",[
            req.body.email
        ]);
        
        if(users.length === 0){
            return res.status(422).json({
                message: "Failed retrieving donations."
            })
        }

        const [donations] = await conn.execute("SELECT * FROM donations WHERE `userId`=?",[
            users[0].userId
        ])

        if(users.length === 0){
            return res.status(422).json({
                message: "Failed retrieving donations."
            })
        }

        var response = [];
        for(var i = 0; i < donations.length; i++){
            const [centers] = await conn.execute("SELECT * FROM centers WHERE `centerId`=?",[
                donations[i].centerId
            ]);

            if(centers.length === 0){
                return res.status(422).json({
                    message: "Failed retrieving donations."
                })
            }

            response.push( {
                description: donations[i].description,
                quantity: donations[i].quantity,
                centerName: centers[0].name
            });
        }

        res.contentType('application/json');
        return res.send(JSON.stringify(response));  

    }
    catch(err){
        next(err);
    }
}