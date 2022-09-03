const {mongoose} = require('mongoose');

const studentDataSchema = new mongoose.Schema(
  {
    user:{
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    dataDiri: {
      kewarnegaraan: {type:String,default:""},
      namaLengkap: {type:String,default:""},
      jenisKelamin: {type:String,default:""},
      tanggalLahir: {type: Date, default: new Date().toLocaleDateString('en-CA')},
      tempatKotaLahir: {type:String,default:""},
      alamatEmail: {type:String,default:""},
      noHp: {type:String,default:""},
    },
    berkasAdministrasi: {
      fotoCopyKartuKeluarga:{
        namaFoto: String,
        data: Buffer,
        mimeType: String,
      },
      fotoCopyIjazah:{
        namaFoto: String,
        data: Buffer,
        mimeType: String,
      },
      fotoCopyPrestasi:{
        namaFoto: String,
        data: Buffer,
        mimeType: String,
      },
      pasFoto:{
        namaFoto: String,
        data: Buffer,
        mimeType: String,
      },
    },
    infoSeleksi:{
      tanggalSeleksi:{type: Date,default: new Date().toLocaleDateString('en-CA')},
      buktiPembayaranSeleksi:{
        namaFoto: String,
        data: Buffer,
        mimeType: String,
      },
      statusPembarayanSeleksi:Boolean,
      statusPenerimaanSeleksi:Boolean,
      prodi:{type:String, default:""}
    },
    daftarUlang: {
      buktiPembayaranDaftarUlang:{
        namaFoto: String,
        data: Buffer,
        mimeType: String,
      },
      statusPembayaranDaftarUlang:{type: String, default:""}
    },
    tanggalRegistrasi:{type: Date,default: new Date().toLocaleString()},
  },
  { 
    timestamps: true,
    versionKey: false,
  }
);
const studentDataModel = mongoose.model('Biodata', studentDataSchema,"student_data");

module.exports = studentDataModel;
