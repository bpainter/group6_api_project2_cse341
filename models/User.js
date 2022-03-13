const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const jsonwebtoken = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    // Schema
});

module.exports = mongoose.model("User", UserSchema);