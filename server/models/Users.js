const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    }
},
{
    versionKey: false
});

const User = mongoose.model('User', usersSchema);
module.exports = User;