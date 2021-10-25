import express from "express";
import data from "./data";
const app = express();
// 1 PRODUCT
// const Product_id = props.match.params.id;
// const product = data.products.find((element) => element.id === Product_id);


app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = data.products.find((element) => element.id === productId);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ msg: "Product NOT FOUND !!" });
  }
});

// ALL PRODUCT
app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.listen(5000, () => {
  console.log("Server Started at http://localhost:5000/");
});
