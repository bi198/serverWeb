import express from "express";
import data from "./data";
import dotenv from "dotenv";
import config from "./config";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";

const app = express();
dotenv.config();
//  MONGODB COMPASS
const mongodbUrl = config.MONGODB_URL;
const mongodbOnlineUrl = config.MONGODB_ONLINE_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log("Success connect to mongodb compass"))
  .catch((error) => console.log(error.reason));
//  MONGODB WEB
// mongoose
//   .connect(mongodbOnlineUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   }).then(console.log("Success connect to mongodb Online"))
//   .catch((error) => console.log(error.reason));
app.use("/api/users", userRoute);
app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = data.products.find((element) => element.id === productId);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ msg: "PRODUCT NOT FOUND !!" });
  }
});

// ALL PRODUCT
app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
  console.log("Server Product at http://localhost:5000/api/products");
});
