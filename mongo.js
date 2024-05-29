const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const url =
  "mongodb+srv://test:test@cluster0.m33n255l.mongodb.net/products-potato?retryWrites=true&w=majority";

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db();
    await db.collection("products").insertOne(newProduct);
  } catch (error) {
    return res.json({ message: "Could not store data." });
  }
  client.close();

  res.json(newProduct);
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);

  let products;

  try {
    await client.connect();
    const db = client.db();
    products = await db.collection("products").find().toArray();
  } catch (error) {
    return res.json({ message: "Could not retrieve products." });
  }
  client.close();

  res.json(products);
};

const getProduct = async (req, res, next) => {
  const client = new MongoClient(url);
  const id = new ObjectID(req.body.id);
  let product;
  try {
    await client.connect();
    const db = client.db();
    product = await db.collection("products").findOne({
      $or: [{ _id: id }],
    });
  } catch (error) {
    return res.json({ message: "Could not retrieve product." });
  }

  client.close();

  res.json(product);
};

const deleteProduct = async (req, res, next) => {
  const client = new MongoClient(url);
  const id = new ObjectID(req.body.id);

  try {
    await client.connect();
    const db = client.db();
    await db.collection("products").deleteOne({ _id: id });
  } catch (error) {
    return res.json({ message: "Could not delete product." });
  }

  client.close();

  res.json({ message: "Deleted successfuly" });
};

const updateProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  const client = new MongoClient(url);
  const id = new ObjectID(req.body.id);

  try {
    await client.connect();
    const db = client.db();
    await db.collection("products").replaceOne({ _id: id }, newProduct);
  } catch (error) {
    return res.json({ message: "Could not update data." });
  }
  client.close();

  res.json({ message: "Updated successfuly" });
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
exports.deleteProduct = deleteProduct;
exports.getProduct = getProduct;
exports.updateProduct = updateProduct;
