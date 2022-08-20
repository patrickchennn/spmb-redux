const express = require("express");
const router = express.Router();
const {
  getBiodatas,getBiodata,
  setBiodata,
  updateBiodata,
  deleteBiodata
} = require("../controllers/biodataController.js");
const { protect } = require("../middleware/authMiddleware.js");


router.route('/').get(protect,getBiodatas).post(protect,setBiodata);
router.route("/:id").get(protect,getBiodata).put(protect,updateBiodata).delete(protect,deleteBiodata);

module.exports = router;