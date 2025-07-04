const express = require("express");
const router = express.Router();
const auth   = require("../middleware/auth");

router.get("/", auth, (req, res) => {
  res.json({ message: "Protected profile data", user: req.user });
});

module.exports = router;
