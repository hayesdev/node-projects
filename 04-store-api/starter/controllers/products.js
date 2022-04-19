const getAllProductsStatic = async (req, res) => {
  // instead of setting up custom middleware
  throw new Error("testing async errors");
  // res.status(200).json({ msg: "products testing route " });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "products route" });
};

module.exports = { getAllProducts, getAllProductsStatic };
