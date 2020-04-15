const jwt=require('jsonwebtoken')
const webdata={
    id:1,
    username:'user1'
}
const token=jwt.sign(webdata,'jwt@123')
console.log(token)