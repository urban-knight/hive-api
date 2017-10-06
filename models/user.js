var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
    email: String,
    password: String,
});

module.exports = mongoose.model("User", UserSchema);
