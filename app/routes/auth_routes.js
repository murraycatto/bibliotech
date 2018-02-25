var ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');

module.exports = function(app,db) {

  app.post("/signup",(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    var query = { email:email };
    db.collection('users').find(query).toArray(function(err, result) {
      if(err){
        res.send({'error':'an error as occured:'+err});
      }else{
        if(result.length === 0){
          if(password){
            bcrypt.hash(password, 10, function(err, hashedPassword) {
              const user = {email:email, password:hashedPassword};
          		db.collection('users').insert(user,(insert_err,insert_esult)=>{
          			if(insert_err){
          				res.send({'error':'an error as occured:'+insert_err});
          			}else{
          				res.send(insert_esult.ops[0])
          			}
          		});
            });
          }else{
            res.send({'error':'Password cannot be blank'});
          }
        }else{
          res.send({'error':'Email already taken'});
        }
      }
    });
	});

  app.post("/login",(req,res) => {

	});

}
