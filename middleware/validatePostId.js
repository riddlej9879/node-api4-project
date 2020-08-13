const postDb = require("../posts/postDb");

function validatePostId() {
  return (req, res, next) => {
    postDb
      .getById(req.params.id)
      .then((post) => {
        if (post) {
          // attach the user data to the request
          // so we can access it later
          req.post = post;
          next();
        } else {
          res.status(404).json({
            message: "Invalid user id",
          });
        }
      })
      .catch(next);
  };
}

module.exports = { validatePostId };
