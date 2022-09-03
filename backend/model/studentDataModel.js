const {mongoose} = require('mongoose');

const studentDataSchema = new mongoose.Schema(
  {
    user:{
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    dataDiri: {
      namaLengkap: {type:String, default:""},
      jenisKelamin: {type:String, default:""},
      kewarnegaraan: {type:String, default:""},
      tempatKotaLahir: {type:String, default:""},
      tanggalLahir: {type:String, default:new Date().toLocaleDateString('en-CA')},
      alamatEmail: {type:String, default:""},
      noHp: {type:String,default:""},
    },
    berkasAdministrasi: {
      fotoCopyKartuKeluarga:{
        type:{
          namaFoto: String,
          data: Buffer,
          mimeType: String,
        },
        default:null,
      },
      fotoCopyIjazah:{
        type:{
          namaFoto: String,
          data: Buffer,
          mimeType: String,
        },
        default:null,
      },
      fotoCopyPrestasi:{
        type:{
          namaFoto: String,
          data: Buffer,
          mimeType: String,
        },
        default:null,
      },
      pasFoto:{
        type:{
          namaFoto: String,
          data: Buffer,
          mimeType: String,
        },
        default:null,
      },
    },
    infoSeleksi:{
      tanggalSeleksi:{type: String,default: new Date().toLocaleDateString('en-CA')},
      buktiPembayaranSeleksi:{
        type:{
          namaFoto: String,
          data: Buffer,
          mimeType: String,
        },
        default:null,
      },
      statusPembarayanSeleksi:Boolean,
      statusPenerimaanSeleksi:Boolean,
      prodi:{type:String, default:""}
    },
    daftarUlang: {
      buktiPembayaranDaftarUlang:{
        type:{
          namaFoto: String,
          data: Buffer,
          mimeType: String,
        },
        default:null,
      },
      statusPembayaranDaftarUlang:{type: String, default:""}
    },
    tanggalRegistrasi:{type: String, default: new Date().toLocaleString()},
  },
  { 
    timestamps: true,
    versionKey: false,
  }
);
const studentDataModel = mongoose.model('Biodata', studentDataSchema,"student_data");

module.exports = studentDataModel;
