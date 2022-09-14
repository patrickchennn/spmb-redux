const asyncHandler = require("express-async-handler");
const studentDataModel = require("../model/studentDataModel.js");

/**
 * @desc Get all registered student data
 * @route GET /api/student-datas
 * @access Private
 */
const getStudentDatas = asyncHandler(async (req,res) => {
  const studentDatas = await studentDataModel.find();
  res.status(200).json(studentDatas);
});


/**
 * @desc Get individual registered student data
 * @route GET /api/student-data
 * @access Private
 */
const getStudentData = asyncHandler(async (req,res) => {
  const studentData = await studentDataModel.findById(req.params.id);
  if(!studentData)  res.status(400).json(studentData);

  res.status(200).json(studentData);
});


/**
 * @desc Set student data with default value
 * @route POST /api/student-data
 * @access Private
 */
const setStudentData = asyncHandler(async (req,res) => {
  console.log("POST /api/student-data: ",req.body);
  console.log(req.body.berkasAdministrasi);
  console.log(req.body.berkasAdministrasi.fotoCopyKartuKeluarga);
  console.log(req.body.dataDiri)

  const studentData = await studentDataModel.create(
    {
      _id: req.user._id.toString(),
      user:{
        _id: req.user._id.toString()
      },
      dataDiri: {
        namaLengkap: req.body.dataDiri.namaLengkap,
        jenisKelamin: req.body.dataDiri.jenisKelamin,
        kewarganegaraan: req.body.dataDiri.kewarganegaraan,
        tempatKotaLahir: req.body.dataDiri.tempatKotaLahir,
        tanggalLahir: req.body.dataDiri.tanggalLahir,
        alamatEmail: req.body.dataDiri.alamatEmail,
        noHp: req.body.dataDiri.noHp,
      },
      berkasAdministrasi: {
        fotoCopyKartuKeluarga:req.body.berkasAdministrasi.fotoCopyKartuKeluarga,
        fotoCopyIjazah:req.body.berkasAdministrasi.fotoCopyIjazah,
        fotoCopyPrestasi:req.body.berkasAdministrasi.fotoCopyPrestasi,
        fotoCopyUAN:req.body.berkasAdministrasi.fotoCopyUAN,
        pasFoto:req.body.berkasAdministrasi.pasFoto,
      },
      infoSeleksi:{
        tanggalUjian:req.body.infoSeleksi.tanggalSeleksi,
        buktiPembayaranSeleksi:req.body.infoSeleksi.buktiPembayaranSeleksi,
        statusPembayaranSeleksi: req.body.infoSeleksi.statusPembayaranSeleksi,
        statusPenerimaanSeleksi: req.body.infoSeleksi.statusPenerimaanSeleksi,
        prodi:req.body.infoSeleksi.prodi
      },
      daftarUlang: {
        buktiPembayaranDaftarUlang: req.body.daftarUlang.buktiPembayaranDaftarUlang,
        statusPembayaranDaftarUlang: req.body.daftarUlang.statusPembayaranDaftarUlang
      },
      tanggalRegistrasi:new Date().toLocaleString(),
    }
  )

  res.status(200).json(studentData);
})


/**
 * @desc Update student data
 * @route PUT /api/student-data/:id
 * @access Private
 */
const updateStudentData = asyncHandler(async (req,res) => {
  const id = req.params.id;
  const studentData = await studentDataModel.findById(id);
  if(!studentData)  res.status(400).json(studentData);
  // console.log(req.user._id.toString());
  if(req.user._id.toString()!==id){
    res.status(401);
    throw new Error(`${studentData.email} you are not allowed to modify other people data!`);
  }
  console.log(req.body)
  const updatedStudentData = await studentDataModel.findByIdAndUpdate(
    id,
    req.body,
  )
  res.status(200).json(updatedStudentData);
});

module.exports = {
  getStudentDatas,
  getStudentData,
  setStudentData,
  updateStudentData,
};
