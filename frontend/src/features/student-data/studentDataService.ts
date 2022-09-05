import axios from "axios";
const API_URL = "/api/student-data/";

const createStudentDataDefault = async ({email, token}: {email:string, token:string}) => {
  const studentDataDefault = {
    dataDiri: {
      namaLengkap: "",
      jenisKelamin: "",
      kewarganegaraan: "",
      tanggalLahir: new Date().toLocaleDateString('en-CA'),
      tempatKotaLahir: "",
      alamatEmail: email,
      noHp: "",
    },
    berkasAdministrasi: {
      fotoCopyKartuKeluarga:null,
      fotoCopyIjazah:null,
      fotoCopyPrestasi:null,
      fotoCopyUAN:null,
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

interface BioData{
  dataDiri:{
    namaLengkap: string,
    jenisKelamin: string,
    kewarganegaraan: string,
    tempatKotaLahir: string,
    tanggalLahir: string,
    alamatEmail: string,
    noHp: string,
  }
}
const updateStudentData = async (bioData: BioData,{token,id}: {token:string,id:string}) => {
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  const response = await axios.put(API_URL+id, bioData,config)
  return response.data
}


// get student data from server
const getStudentData = async ({token,id}: {token:string,id:string}) => {
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL+id,config)
  return response.data
}

const studentDataService = { createStudentDataDefault, updateStudentData,getStudentData }

export default studentDataService