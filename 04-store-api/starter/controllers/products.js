const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  // const search = "ab";
  // instead of setting up custom middleware
  const products = await Product.find({ price: { $gt: 30 } })
    .sort("price")
    .select("name price")
    .limit(10);
  // MongoDB query operators
  // name: { $regex: search, $options: "i" },
  res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  // if featured does not exist, queryObject stays empty and
  // find() returns all products
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    // this maps user-friendly operators to mongoose operators
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    // no spaces in this regex string
    const regEx = /\b(>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
    console.log(filters);
  }

  console.log(queryObject);
  // since req.query is an object we can pass it into find()
  let result = Product.find(queryObject);
  if (sort) {
    console.log(sort);
    // products = product.sort();
    let sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    let fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  // 23
  // 4 7 7 7 2
  const products = await result;
  res.status(200).json({ nbHits: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };
