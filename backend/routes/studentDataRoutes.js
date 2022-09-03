const express = require("express");
const router = express.Router()
const {
  getStudentDatas, getStudentData,
  setStudentData,
  updateStudentData,
  deleteStudentData
} = require("../controllers/studentDataController.js");
const { protect } = require("../middleware/authMiddleware.js")


router.route('/')
  .get(protect,getStudentDatas)
  .post(protect,setStudentData)

router.route("/:id")
  .get(protect,getStudentData)
  .put(protect,updateStudentData)
  .delete(protect,deleteStudentData)

module.exports = router