const mongoose = require("mongoose");

// before making environment variable
// const connectionString =
//   "mongodb+srv://ghayes:j6sMttc4LEPHch@nodeprojects.xkcjg.mongodb.net/NodeProjects?retryWrites=true&w=majority";

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
