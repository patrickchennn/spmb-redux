const asyncHandler = require("express-async-handler");
const biodataModel = require("../model/biodataModel.js");
const userModel = require("../model/userModel.js");

/**
 * @desc Get all registered student data
 * @route GET /api/biodatas
 * @access Private
 */
const getBiodatas = asyncHandler(async (req,res) => {
  const biodatas = await biodataModel.find();
  res.status(200).json(biodatas);
});


/**
 * @desc Get individual registered student data
 * @route GET /api/biodata
 * @access Private
 */
const getBiodata = asyncHandler(async (req,res) => {
  const biodata = await biodataModel.findById(req.params.id);
  if(!biodata)  res.status(400).json(biodata);

  res.status(200).json(biodata);
});


/**
 * @desc Set biodata
 * @route POST /api/biodata
 * @access Private
 */
const setBiodata = asyncHandler(async (req,res) => {
  if(!req.body.namalengkap){
    res.status(400);
    throw new Error("please add a name");
  }
  const biodata = await biodataModel.create({
    user: req.user.id,
    _id: req.user.id,
    namalengkap: req.body.namalengkap,
    kebangsaan: req.body.kebangsaan,
    tanggalLahir: req.body.tanggalLahir,
    lokasiKotaLahir: req.body.lokasiKotaLahir,
    email: req.user.email,
    phonenumber: req.body.phonenumber,
    prodi: req.body.prodi,
    tanggalRegistrasi: new Date().toLocaleString(),
    // pasFoto:{
    //   data: Buffer,
    //   contentType: String,
    //   path: String,
    // }
  });
  res.status(200).json(biodata);
}
);


/**
 * @desc Update biodata
 * @route PUT /api/biodata/:id
 * @access Private
 */
const updateBiodata = asyncHandler(async (req,res) => {
  const id = req.params.id;
  const biodata = await biodataModel.findById(id);
  if(!biodata)  res.status(400).json(biodata);
  // console.log(req.user._id.toString());
  if(req.user._id.toString()!==id){
    res.status(401);
    throw new Error(`${biodata.email} you are not allowed to modify other people data!`);
  }
  const updatedBiodata = await biodataModel.findByIdAndUpdate(
    id,
    req.body,
    {new:true}
  )
  res.status(200).json(updatedBiodata);
});


/**
 * @desc Delete biodata
 * @route DELETE /api/biodata/:id
 * @access Private
 */
const deleteBiodata = asyncHandler(async (req,res) => {
  const id = req.params.id;
  const biodata = await biodataModel.findById(id);
  if(!biodata)  res.status(400).json(biodata);
  if(req.user._id.toString()!==id){
    res.status(401);
    throw new Error(`${biodata.email} you are not allowed to modify other people data!`);
  }
  console.log(req.user);
  await biodataModel.findByIdAndDelete(id);
  res.status(200).json({id});
});

module.exports = {
  getBiodatas,
  getBiodata,
  setBiodata,
  updateBiodata,
  deleteBiodata
}

/*
{
      namalengkap: req.body.namalengkap,
      kebangsaan: req.body.kebangsaan,
      tanggalLahir: req.body.tanggalLahir,
      lokasiKotaLahir: req.body.lokasiKotaLahir,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      prodi: req.body.prodi,
      tanggalRegistrasi: new Date().toLocaleString(),
      // pasFoto:{
      //   data: Buffer,
      //   contentType: String,
      //   path: String,
      // }
    }
*/