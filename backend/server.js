const colors = require('colors')
const path = require('path')
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

const uploadFilter = (req,file,cb)=>{
  const fileType = file.mimetype
  const fileName = file.originalname
  const fileExtention = fileName.substr(fileName.lastIndexOf('.') + 1);
  console.log(fileType)
  if(fileType!=="image/jpeg" && fileType!=="image/gif" && fileType!=="image/png")
  {
    const errMsg = `Only images are allowed. File ${fileName} with extention ${fileExtention} is not allowed`
    req.fileValidationError = errMsg
    return cb(null,false,new Error(errMsg))
  }
  cb(null,true)
}

const upload = multer({
  storage,
  fileFilter: uploadFilter,
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use("/api/student-data",require("./routes/studentDataRoutes.js"))
app.use("/api/user",require("./routes/userRoutes.js"))



// handle post request from /spmb-form/berkas-administrasi
// protect the route because it's a route that someone who has no credential(JWT/not logged in) should not be able to send any data
app.post(
  "/api/berkas-adm",
  protect,
  upload.fields([
    {name: "fotoCopyKartuKeluarga", maxCount: 1},
    {name: "fotoCopyIjazah", maxCount: 1},
    {name: "fotoCopyPrestasi", maxCount: 1},
    {name: "fotoCopyUAN", maxCount: 1},
    {name: "pasFoto", maxCount: 1},
  ]),
  async (req,res) => {
    const finalBerkasAdm = {
      berkasAdministrasi: {
        fotoCopyKartuKeluarga:"",
        fotoCopyIjazah:"",
        fotoCopyPrestasi:"",
        fotoCopyUAN:"",
        pasFoto:"",
      }
    }
    if(req.fileValidationError){
      res.status(400).json(req.fileValidationError)
      return
    }

    console.log("req.body: ", req.body)
    console.log(req.files)


    Object.keys(req.files).forEach(key => {
      const {originalname,mimetype,buffer} = req.files[key][0]
      finalBerkasAdm.berkasAdministrasi[key] = {
        name:originalname,
        mimetype,
        data:buffer,
        isAccepted: req.body[key],
      }
    })

    console.log("berkas adm to be send to database: ",finalBerkasAdm)
    
    const updatedStudentData = await studentDataModel.findByIdAndUpdate(
      req.user._id.toString(),
      finalBerkasAdm,
    )
    res.status(200).json(updatedStudentData);

    // res.status(200).json("ye")
  }
)


app.post(
  "/api/info-seleksi",
  protect,
  upload.single("buktiPembayaranSeleksi"),
  async (req,res) => {
    const final = {
      infoSeleksi:{
        prodi: "",
        tanggalUjian: "",
        statusPenerimaanSeleksi: "",
        buktiPembayaranSeleksi: {
          name: "",
          mimetype: "",
          data:"",
          isAccepted:""
        }
      }
    }
    const infoSeleksiFromClient = JSON.parse(req.body.infoSeleksi)
    const isAccepted = req.body.buktiPembayaranSeleksi
    // console.log("isAccepted? ",isAccepted)
    // console.log("req.body: ", req.body)
    // console.log(req.file)
    if(req.file){
      const { originalname,mimetype,buffer }  = req.file
      final.infoSeleksi = {
        ...final.infoSeleksi,
        buktiPembayaranSeleksi:{
          name: originalname,
          mimetype,
          data:buffer,
          isAccepted
        }
      }
      // console.log(final)
    }

    final.infoSeleksi = {
      ...final.infoSeleksi,
      prodi: infoSeleksiFromClient.prodi,
      tanggalUjian: infoSeleksiFromClient.tanggalUjian,
      statusPenerimaanSeleksi: infoSeleksiFromClient.statusPenerimaanSeleksi,
    }

    console.log("FINAL info seleksi data to be submitted",final)
    
    const updatedStudentData = await studentDataModel.findByIdAndUpdate(
      req.user._id.toString(),
      final,
    )
    res.status(200).json(updatedStudentData);

    // res.status(200).json("ye")
  }
)

// server frontend
if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/build")))
  app.get('*', (req,res) => (
    res.sendFile(
      path.resolve(__dirname,'../','frontend','build','index.html')
    )
  ))
}else{
  app.get('/',(req,res) => res.send("in development mode"))
}

app.use(errorHandler)
app.listen(port,console.log(`\napp running on http://localhost:${port}`));
