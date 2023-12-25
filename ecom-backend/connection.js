require("dotenv").config();

const mongoose = require("mongoose");

const connectionStr = process.env.MONGO_URI;

mongoose
  .connect(connectionStr, { useNewUrlparser: true })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));

mongoose.connection.on("error", (err) => {
  console.log(err);
});

// pass - Q712Xfy63Do0TcEm;
// user-ecomern-yt;