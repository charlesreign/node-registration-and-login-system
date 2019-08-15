const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    email:{
        type: String,
        unique: true,
        trim: true,
        minLength: 8,
        required: true
    },

    password:{
        type: String,
        minLength: 8,
        required: true
    }
});
module.exports = mongoose.model('users',userSchema);