const express = require("express");
const router = express.Router();
const { registerUser, loginUser, deleteUser, getMe } = require("../controllers/userController.js");
const { protect } = require("../middleware/authMiddleware.js");

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.delete("/delete", protect,deleteUser)
module.exports = router;
