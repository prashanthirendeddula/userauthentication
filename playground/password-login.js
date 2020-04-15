const bcryptjs=require('bcryptjs')
const encryptedpassword="$2a$10$nQcttWO.NCOHe.6g4ZO42u4JDFUJSp5VqXtiNjVoNxi.xpSG8MTfq"
const password="secret@123"
bcryptjs.compare(password,encryptedpassword)
       .then(function(result){
        console.log(result)
       })
