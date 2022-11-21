var mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/UserData");
var db = mongoose.connection;

// User Schema
var userMessageSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
  },
  role: {
    type: String,
    default: "userMessage",
  },
});

var UserMessage = (module.exports = mongoose.model(
  "UserMessage",
  userMessageSchema
));

module.exports.createNewMessage = function (newMessage, callback) {
  newMessage.save(callback);
};
