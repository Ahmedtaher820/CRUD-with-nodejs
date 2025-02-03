const mongoose = require('mongoose')
const schema = mongoose.Schema

const UserSchema = new schema({
    userName:String,
    email:String,
    password:String,
    phone:Number,
},
{
    timestamps:true
}
)
const User = mongoose.model('User',UserSchema)

module.exports = User