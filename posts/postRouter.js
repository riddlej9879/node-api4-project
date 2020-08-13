const express = require("express");
const postDb = require("../posts/postDb");

const { validatePostId } = require("../middleware/validatePostId");

const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  try {
    postDb.get().then((posts) => {
      return res.status(200).json(posts);
    });
  } catch (err) {
    return res.status(500).json({ message: "Error retrieving post database" });
  }
});

router.get("/:id", validatePostId(), (req, res) => {
  // do your magic!
  res.status(200).json(req.post);
});

router.delete("/:id", validatePostId(), (req, res) => {
  // do your magic!
  const postId = req.params.id;
  try {
    postDb.delete(postId).then(() => {
      return res.status(200).json({ message: "Post deleted" });
    });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting post" });
  }
});

router.put("/:id", validatePostId(), (req, res) => {
  // do your magic!
  const postId = req.params.id;
  const updatePost = {
    text: req.body.text,
  };
  try {
    postDb.update(postId, updatePost).then((post) => {
      return res.status(200).json(post);
    });
  } catch (err) {
    return res.status(500).json({ message: "Error updating post" });
  }
});

//    custom middleware

//    Moved to ../middleware/ folder

module.exports = router;
