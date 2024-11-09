const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://Yash:abcd@cluster0.mqmqb.mongodb.net/")
  .then(() => {
    console.log("mongo connected !");
  })
  .catch(() => {
    console.log("failed to connect !");
  });

const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

collection = new mongoose.model("collection1", loginSchema);
module.exports = collection;
