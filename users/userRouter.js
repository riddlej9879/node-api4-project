const express = require("express");
const userDb = require("./userDb.js");
const postDb = require("../posts/postDb.js");

const { validateUserId } = require("../middleware/validateUserId");
const { validateUser } = require("../middleware/validateUser");
const { validatePost } = require("../middleware/validatePost");

const router = express.Router();

// Returns a list of users
router.get("/", (req, res) => {
  // do your magic!
  try {
    userDb.get().then((users) => {
      return res.status(200).json(users);
    });
  } catch (err) {
    return res.status(500).json({ message: "Error retrieving user database" });
  }
});

// Returns user by ID
router.get("/:id", validateUserId(), (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

// Returns list of Posts by user ID
router.get("/:id/posts", validateUserId(), (req, res) => {
  // do your magic!
  const userId = req.params.id;
  try {
    userDb.getUserPosts(userId).then((userPosts) => {
      if (userPosts.length === 0) {
        return res
          .status(404)
          .json({ message: "Could not retrieve user posts" });
      } else {
        return res.status(200).json(userPosts);
      }
    });
  } catch (err) {
    return res.status(500).json({ message: "Error retrieving posts" });
  }
});

// Creates new user
router.post("/", validateUser(), (req, res) => {
  // do your magic!
  const newUser = {
    name: req.body.name,
  };
  try {
    userDb.insert(newUser).then((user) => {
      return res.status(201).json(user);
    });
  } catch (err) {
    return res.status(500).json({ message: "Error creating new user" });
  }
});

// Creates new post by userId
router.post("/:id/posts", validateUserId(), validatePost(), (req, res) => {
  // do your magic!
  const newPost = {
    text: req.body.text,
    user_id: req.params.id,
  };
  try {
    postDb.insert(newPost).then((post) => {
      return res.status(201).json(post);
    });
  } catch (err) {
    return res.status(500).json({ message: "Error creating new post" });
  }
});

router.delete("/:id", validateUserId(), (req, res) => {
  // do your magic!
  const userId = req.params.id;
  try {
    userDb.remove(userId).then(() => {
      return res.status(200).json({ message: "User deleted" });
    });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting user" });
  }
});

router.put("/:id", validateUserId(), validateUser(), (req, res) => {
  // do your magic!
  const id = req.params.id;
  const updateUser = {
    name: req.body.name,
  };
  try {
    userDb.update(id, updateUser).then((user) => {
      return res.status(202).json(user);
    });
  } catch (err) {
    return res.status(500).json({ message: "Error updating user" });
  }
});

//    custom middleware

//    Moved to ../middleware/ folder

module.exports = router;

// const db = required(database)

// server.get(async (req, res) => {
//   const postsPromise = db.find()
//   const usersPormiss = db.find()
// })
