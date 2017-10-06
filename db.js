const mongoose = require('mongoose');
const { promisifyAll } = require('bluebird');
promisifyAll(mongoose);

var uri = "mongodb://" + process.env.DB_HOST + "/" + process.env.DB_NAME;

mongoose.Promise = global.Promise;
var conn = mongoose.connect(uri, {useMongoClient: true}, (err)=>{
  console.log("Mongoose connected to [" + process.env.DB_NAME + "]");
});

module.exports = conn;