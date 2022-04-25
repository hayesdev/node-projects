const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  // instead of setting up custom middleware
  const products = await Product.find({
    name: "high-back bench",
  });
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company } = req.query;
  const queryObject = {};

  // if featured does not exist, queryObject stays empty and
  // find() returns all products
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }

  // since req.query is an object we can pass it into find()
  const products = await Product.find(queryObject);
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
