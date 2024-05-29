const express = require("express");
const bodyParser = require("body-parser");
const mongoPractice = require("./mongo");

const app = express();

app.use(bodyParser.json());

app.post("/products", mongoPractice.createProduct);

app.put("/product", mongoPractice.updateProduct);

app.get("/products", mongoPractice.getProducts);

app.get("/product", mongoPractice.getProduct);

app.delete("/product", mongoPractice.deleteProduct);

app.listen(3000, () => {
  console.log("listening in port 3000");
});
