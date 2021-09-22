const { request, response } = require('express')
const express = require('express')
const { isValidObjectId } = require('mongoose')
const router = express.Router()
const userTemplateCopy = require('../models/userModels')
router.post('/signup',(request,response)=>{
    const signedUpUser = new userTemplateCopy({
        firstName:request.body.firstName,
        lastName:request.body.lastName,
        email:request.body.email,
        password:request.body.password,
        btc:request.body.btc,
        eth:request.body.eth,
        invest:request.body.invest,
    })
    userTemplateCopy.findOne({email:request.body.email},function(err,data){
		if(data){
            response.send({"Success":"Exist email"});
        }
        else{
            signedUpUser.save()
            .then(data=>{
                response.json(data)
            })
            .catch(error=>{
                response.json(error)
            })
        }
    })
})


router.post('/login',(req,res)=>{
    userTemplateCopy.findOne({email:req.body.email},function(err,data){
		if(data){
			if(data.password === req.body.password){
				console.log("Done Login");
				res.send({"Success":"Success!"});
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	});
})
router.post('/getData',(req,res)=>{
    userTemplateCopy.findOne(req.body,function(err,data){
        res.send(data);
    })
})
router.post('/saveData',(req,res)=>{
    const query = {email: req.body.email};
const update = {
  $set: {
    btc: req.body.btc,
    eth: req.body.eth,
    invest : req.body.invest
  }
};
userTemplateCopy.updateOne(query, update, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
  });
})
module.exports = router