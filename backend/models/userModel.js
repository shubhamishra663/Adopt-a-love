const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token:{type:String,default:null},
    userType: { type: String, default: null },
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }] 
    
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
