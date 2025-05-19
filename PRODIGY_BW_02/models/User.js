const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type : String, required : true},
    email: {
        type : String,
        required : true, 
        unique : true,
        match : [/\S+@\S+\.\S+/, 'is invalid']
    },
    age : {type : Number, required : true},
}, 

{timestamps : true}

);

module.exports = mongoose.model("User", userSchema);
