const asyncHandler = require("express-async-handler");
const biodataModel = require("../model/studentDataModel.js");
const studentDataModel = require("../model/studentDataModel.js");

/**
 * @desc Get all registered student data
 * @route GET /api/student-datas
 * @access Private
 */
const getStudentDatas = asyncHandler(async (req,res) => {
  const studentDatas = await biodataModel.find();
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

  res.status(200).json(biodata);
});


/**
 * @desc Set student data with default value
 * @route POST /api/student-data
 * @access Private
 */
const setStudentData = asyncHandler(async (req,res) => {
  console.log(req.body);
  const biodata = await biodataModel.create(
    {
      _id: req.user._id.toString(),
      user:{
        _id: req.user._id.toString()
      },
      dataDiri: {
        namaLengkap: req.body.namaLengkap,
        jenisKelamin: req.body.jenisKelamin,
        kewarnegaraan: req.body.kewarnegaraan,
        tempatKotaLahir: req.body.tempatKotaLahir,
        tanggalLahir: req.body.tanggalLahir,
        alamatEmail: req.body.alamatEmail,
        noHp: req.body.noHp,
      },
      berkasAdministrasi: {
        fotoCopyKartuKeluarga: req.body.fotoCopyKartuKeluarga,
        fotoCopyIjazah: req.body.fotoCopyIjazah,
        fotoCopyPrestasi: req.body.fotoCopyPrestasi,
        pasFoto: req.body.pasFoto,
      },
      infoSeleksi:{
        tanggalSeleksi:req.body.tanggalSeleksi,
        buktiPembayaranSeleksi: req.body.buktiPembayaranSeleksi,
        statusPembarayanSeleksi: req.body.statusPembarayanSeleksi,
        statusPenerimaanSeleksi: req.body.statusPenerimaanSeleksi,
        prodi:req.body.prodi
      },
      daftarUlang: {
        buktiPembayaranDaftarUlang: req.body.buktiPembayaranDaftarUlang,
        statusPembayaranDaftarUlang:req.body.statusPembayaranDaftarUlang
      },
      tanggalRegistrasi:new Date().toLocaleString(),
    }
  )

  res.status(200).json(biodata);
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
  const updatedStudentData = await studentDataModel.findByIdAndUpdate(
    id,
    req.body,
    {new:true}
  )
  res.status(200).json(updatedStudentData);
});


/**
 * @desc Delete student data
 * @route DELETE /api/student-data/:id
 * @access Private
 */
const deleteStudentData = asyncHandler(async (req,res) => {
  const id = req.params.id;
  const studentData = await studentDataModel.findById(id);
  if(!studentData)  res.status(400).json(studentData);

  if(req.user._id.toString()!==id){
    res.status(401);
    throw new Error(`${studentData.email} you are not allowed to modify other people data!`);
  }
  console.log(req.user);
  await studentDataModel.findByIdAndDelete(id);
  res.status(200).json({id});
});

module.exports = {
  getStudentDatas,
  getStudentData,
  setStudentData,
  updateStudentData,
  deleteStudentData
}
