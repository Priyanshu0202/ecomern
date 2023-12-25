const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
require("./connection");
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: "http://localhost:3001",
  methods: ["GET", "POST", "PATCH", "DELETE"],
});

const User = require("../ecom-backend/models/User");
const userRoutes = require("./routes/userRouter");
const productRoutes = require("./routes/productRoutes");
const imageRoutes = require("./routes/imageRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/images", imageRoutes);
app.use("/orders", orderRoutes);

app.post("/create-payment", async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      payment_method_types: ["card"],
    });
    res.status(200).json(paymentIntent);
    console.log("Payment Intent created:", paymentIntent);
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e.message);
  }
});

server.listen(8080, () => {
  console.log("server running at port", 8080);
});
app.set("socketio", io);
