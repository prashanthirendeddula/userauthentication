const express=require('express')
const router=express.Router()
const {authenticateUser}=require('../middlewares/authenticate')
const {User}=require('../models/user')
const _=require('lodash')
//localhost/3000/users/register
router.post('/register',(req,res)=>{
    const body=req.body
    const user=new User(body)
    user.save()
    .then((user)=>{
        res.send(_.pick(user,['_id','username','email']))
    })
    .catch((err)=>{
        res.send(err)
    })
})


//localhost/3000/users/login
router.post('/login',function(req,res){
    const body=req.body
  User.findByCredentials(body.email,body.password)
       .then(function(user){
           return user.generateToken()
       })
          .then(function(token){
              res.setHeader('x-auth',token).send({})
          })
       .catch(function(err){
           res.send(err)
       })
})
//localhost:3000/users/account
router.get('/account',authenticateUser,function(req,res){
    const{user}=req
    res.send(_.pick(user,['_id','username','email']))
})

//localhost/3000/users/logout
router.delete('/logout',authenticateUser,function(req,res){
    const {user,token}=req
    User.findByIdAndUpdate((user._id),{$pull:{tokens:{token:token}}})
               .then(function(){
           res.send('successfully deleted')
       })
       .catch(function(err){
           res.send(err)
       })
})

module.exports={usersRouter:router}