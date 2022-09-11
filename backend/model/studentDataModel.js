const {mongoose} = require('mongoose');

const imageSchema = new mongoose.Schema({
  img: {
    name: String,
    data: Buffer,
    mimetype: String,
    default:"",
  }
},{_id: false})

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
      kewarganegaraan: {type:String, default:""},
      tempatKotaLahir: {type:String, default:""},
      tanggalLahir: {type:String, default:new Date().toLocaleDateString('en-CA')},
      alamatEmail: {type:String, default:""},
      noHp: {type:String,default:""},
    },
    berkasAdministrasi: {
      fotoCopyKartuKeluarga: {
        name: String,
        data: Buffer,
        mimetype: String, default:""
      },
      fotoCopyIjazah: {
        name: String,
        data: Buffer,
        mimetype: String, default:""
      },
      fotoCopyPrestasi: {
        name: String,
        data: Buffer,
        mimetype: String, default:""
      },
      fotoCopyUAN: {
        name: String,
        data: Buffer,
        mimetype: String, default:""
      },
      pasFoto: {
        name: String,
        data: Buffer,
        mimetype: String, default:""
      },
    },
    infoSeleksi:{
      tanggalSeleksi:{type: String,default: new Date().toLocaleDateString('en-CA')},
      buktiPembayaranSeleksi: {
          name: String,
          data: Buffer,
          mimetype: String, default:""
      },
      statusPembayaranSeleksi:String,
      statusPenerimaanSeleksi:Boolean,
      prodi:{type:String, default:""}
    },
    daftarUlang: {
      buktiPembayaranDaftarUlang: {
        name: String,
        data: Buffer,
        mimetype: String, default:""
      },
      statusPembayaranDaftarUlang: String
    },
    tanggalRegistrasi:{type: String, default: new Date().toLocaleString()},
  },
  { 
    timestamps: true,
    versionKey: false,
  }
);
const studentDataModel = mongoose.model('Biodata', studentDataSchema,"student_data");

module.exports = studentDataModel
