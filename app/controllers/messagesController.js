const Messages=require('../models/messages')
const {authenticateUser}=require('../middlewares/authenticate')
const express=require('express')
const router=express.Router()
router.get('/',(req,res)=>{
    Messages.find()
    .then(messages=>res.json(messages))
    .catch(err=>res.json(err))
})
router.post('/',authenticateUser,(req,res)=>{
    const body=req.body
    const message=new Messages(body)
    message.user=req.user._id
    message.save()
    .then(message=>res.json(message))
    .catch(err=>res.json(err))
})

router.get('/:id', authenticateUser, (req, res) => {
    const id = req.params.id 
    Message.findOne({
        _id: id,
        user: req.user._id 
    })
    .then(message => {
        if(message) {
            res.json(message)
        } else {
            res.json({})
        }
    })
})

// put 
// Message.findOneAndUpdate({ _id: id, user: req.user._id})

// delete
// Message.findOneAndDelete({ _id: id, user: req.user._id })
module.exports={
    messagesRouter:router
}