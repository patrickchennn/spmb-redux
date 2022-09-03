import axios from "axios";
const API_URL = "/api/student-data/";

const createStudentDataDefault = async ({email, token}: {email:string, token:string}) => {
  const studentDataDefault = {
    dataDiri: {
      namaLengkap: "",
      jenisKelamin: "",
      kewarnegaraan: "",
      tanggalLahir: new Date().toLocaleDateString('en-CA'),
      tempatKotaLahir: "",
      alamatEmail: email,
      noHp: "",
    },
    berkasAdministrasi: {
      fotoCopyKartuKeluarga:null,
      fotoCopyIjazah:null,
      fotoCopyPrestasi:null,
      pasFoto:null,
    },
    infoSeleksi:{
      tanggalSeleksi: new Date().toLocaleDateString('en-CA'),
      buktiPembayaranSeleksi:null,
      statusPembarayanSeleksi:"",
      statusPenerimaanSeleksi:"",
      prodi:""
    },
    daftarUlang: {
      buktiPembayaranDaftarUlang:null,
      statusPembayaranDaftarUlang: null
    },
    tanggalRegistrasi:new Date().toLocaleString(),
  }

  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }


  const response = await axios.post(API_URL,studentDataDefault,config)
  console.log(response)
  return response.data
}

const studentDataService = {
  createStudentDataDefault,
}

export default studentDataService