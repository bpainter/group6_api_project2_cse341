const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: false
    },
    jobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        }
    ]
});

module.exports = mongoose.model("User", UserSchema);