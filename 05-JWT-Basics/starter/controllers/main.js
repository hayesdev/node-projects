//check username, password in post(login) request
// if it exists create new JWT
// send back to front-end
// set up auth so only request with JWT can access dashboard

const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = (req, res) => {
  const { username, password } = req.body;
  // mongo
  // Joi
  // check in controller
  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }

  // usually db provides this
  const id = new Date().getDate();

  // try to keep payloads small, better UX
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  console.log(username, password);
  res.status(200).json({ msg: "user created", token });
};

const dashboard = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
  } catch (err) {
    throw new CustomAPIError("Not authorized to access this route", 401);
  }

  console.log(token);

  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello Greg`,
    secret: `Here is your authorized data, your secret number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
