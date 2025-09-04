const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoPractice = require("./mongo");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("build"));

app.post("/products", mongoPractice.createProduct);

app.put("/product", mongoPractice.updateProduct);

app.get("/products", mongoPractice.getProducts);

app.get("/product", mongoPractice.getProduct);

app.delete("/product", mongoPractice.deleteProduct);

app.listen(process.env.PORT || 5000, () => {
  console.log("listening in port 5000");
});
