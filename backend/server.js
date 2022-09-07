const colors = require('colors')
const express = require("express")
const bodyParser = require("body-parser")
const {errorHandler} = require("./middleware/errorMiddleware.js")
require("dotenv").config()
const connectDB = require("./config/db.js")
const multer = require("multer")
const { protect } = require('./middleware/authMiddleware.js')
const studentDataModel = require("./model/studentDataModel.js")

connectDB()
const app = express()
const port = process.env.PORT
const storage = multer.memoryStorage()
const upload = multer({storage})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use("/api/student-data",require("./routes/studentDataRoutes.js"))
app.use("/api/user",require("./routes/userRoutes.js"))

app.use(errorHandler)


// handle post request from /spmb-form/berkas-administrasi
// protect the route because it's a route that someone who has no credential(JWT/not logged in) should not be able to send any data
app.post(
  "/api/berkas-adm",
  protect,
  // upload.single("berkasAdministrasi")
  // upload.array("berkasAdministrasi",5)
  // upload.fields([
  //   {name: "berkasAdministrasi",maxCount:5}
  // ])
  upload.fields([
    {name: "fotoCopyKartuKeluarga", maxCount: 1},
    {name: "fotoCopyIjazah", maxCount: 1},
    {name: "fotoCopyPrestasi", maxCount: 1},
    {name: "fotoCopyUAN", maxCount: 1},
    {name: "pasFoto", maxCount: 1},
  ])
  ,async (req,res) => {
    const finalBerkasAdm = {
      berkasAdministrasi: {
        fotoCopyKartuKeluarga:null,
        fotoCopyIjazah:null,
        fotoCopyPrestasi:null,
        fotoCopyUAN:null,
        pasFoto:null,
      }
    }

    const berkasAdm = req.files
    console.log("req.body: ", req.body)
    console.log(berkasAdm)
    Object.keys(berkasAdm).forEach(key => {
      const {originalname,mimetype,buffer} = berkasAdm[key][0]
      finalBerkasAdm.berkasAdministrasi[key] = {
        namaForo:originalname,
        mimeType:mimetype,
        data:buffer
      }
    })

    console.log("berkas adm to be send to database: ",finalBerkasAdm)
    const updatedStudentData = await studentDataModel.findByIdAndUpdate(
      req.user._id.toString(),
      finalBerkasAdm,
      // [options.new=false] «Boolean» if true, return the modified document rather than the original
      // {new:true}
    )
    res.status(200).json(updatedStudentData);
  }
)

app.listen(port,console.log(`\napp running on http://localhost:${port}`))

