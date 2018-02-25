var ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');

module.exports = function(app,db) {
  // TODO Add Sign up Login functions
  app.post("/signup",(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    if(checkEmail(email)){
      const hashedPassword = hashPassword(password);
      const user = {email:email, password:hashedPassword};
  		db.collection('users').insert(user,(err,result)=>{
  			if(err){
  				res.send({'error':'an error as occured:'+err});
  			}else{
  				res.send(result.ops[0])
  			}
  		});
    }else{
      res.send({'error':'Email already taken'});
    }
	});

  app.post("/login",(req,res) => {
    var query = { email:req.body.email, password:req.body.password};
	});

  function checkEmail(email) {
    var query = { email:email};
    db.collection('users').find(query).toArray(function(err, result) {
      if(err){
        console.log(err);
        return false;
      }else{
        if(result.length == 0){
          return true;
        }else {
          return false;
        }
      }
		});
  }

  function hashPassword(password){
    bcrypt.hash(password, 12, function(err, hash) {
      if(err){
        console.log(err);
        return "";
      }else{
        return hash;
      }
    });
  }
}
