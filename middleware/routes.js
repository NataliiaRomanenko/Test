var fs = require('fs');
var User = require('./dbShemas').User;
var HttpError = require('./error').HttpError;
var AuthError = require('./error').AuthError;
var config = require('../config/index');
var path = require('path');


module.exports = function(app) {

    app.post('/addData', async function(req, res, next) {
        try {
            //тут не чего не менял
            console.log('/addData bodyReq: ',req.body);
            var username = req.body.username;
            var password = req.body.password;
            var age = req.body.age;
            var email = req.body.email;
            console.log('/addData param: ',username,",",password,",",age,",",email);
            if(!username || !password) return next(new HttpError(403, 'incorrect request'));//вот это срабатывало тк только
            //username был а остальные были undef тк не было разделителя & . Вроде все!
            let user = await User.findOne({username:username});
            if(!user) {
                user = new User({
                    username: username,
                    password: password,
                    age: age,
                    email:email
                });
                user.save();
                console.log('/login user: ', user);
                res.send({user});
            } else res.send(null);
        } catch(err) {
            console.log('/login err: ',err);
            return next(err);
        }
    });

    app.post('/getUsers',async function(req, res, next) {
        console.log('function find()');
        let users = await User.find({});
        console.log("getUsers: ",users);
        if(users) res.send(users);
    });

/*    app.put("/putData", jsonParser, function(req, res){

        if(!req.body) return res.sendStatus(400);
        const id = new objectId(req.body.id);
        var username = req.body.username;
        var password = req.body.password;
        var age = req.body.age;
        var email = req.body.email;

        const collection = req.app.locals.collection;
        collection.findOneAndUpdate({_id: id}, { $set: {age: userAge, name: userName}},
            {returnOriginal: false },function(err, result){

                if(err) return console.log(err);
                const user = result.value;
                res.send(user);
            });
    });*/





    // app.delete("/deleteData", (req, res) => {
    //     //     const userId = req.params.id;
    //     //     const details = { '_id': new ObjectID(userId) };
    //     //     db.collection('users').remove(details, (err) => {
    //     //         if (err) {
    //     //             res.send({'error':'An error has occurred'});
    //     //         } else {
    //     //             res.send('user ' + userId + ' deleted!');
    //     //         }
    //     //     });
    //     // })
};

