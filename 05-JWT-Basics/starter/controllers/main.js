//check username, password in post(login) request
// if it exists create new JWT
// send back to front-end
// set up auth so only request with JWT can access dashboard

const CustomAPIError = require("../errors/custom-error");

const login = (req, res) => {
  const { username, password } = req.body;
  // mongo
  // Joi
  // check in controller
  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }
  console.log(username, password);
  res.send("Fake Login/Register/Signup Route");
};
const dashboard = (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello Greg`,
    secret: `Here is your authorized data, your secret number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
