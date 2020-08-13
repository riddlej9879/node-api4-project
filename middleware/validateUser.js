function validateUser() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: "Missing user data" });
    } else if (!req.body.name) {
      return res.status(400).json({ message: "Missing required name field" });
    }
    next();
  };
}

module.exports = { validateUser };
