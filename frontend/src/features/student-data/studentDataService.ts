import axios from "axios";
const API_URL = "/api/student-data/";

const createStudentDataDefault = async ({email, token}: {email:string, token:string}) => {
  const studentDataDefault = {
    dataDiri: {
      namaLengkap: "",
      jenisKelamin: "",
      kewarganegaraan: "",
      tanggalLahir: "",
      tempatKotaLahir: "",
      alamatEmail: email,
      noHp: "",
    },
    berkasAdministrasi: {
      fotoCopyKartuKeluarga:"",
      fotoCopyIjazah:"",
      fotoCopyPrestasi:"",
      fotoCopyUAN:"",
      pasFoto:"",
    },
    infoSeleksi:{
      tanggalUjian: "",
      buktiPembayaranSeleksi:"",
      statusPenerimaanSeleksi:"diproses",
      prodi:"",
      idUjian: new Date().getTime()
    },
    daftarUlang: {
      buktiPembayaranDaftarUlang: "",
    },
    tanggalRegistrasi:new Date().toLocaleString(),
  }

  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL,studentDataDefault,config)
  // console.log(response)
  return response.data
}

const updateStudentData = async (studentData: any, {token,id}: {token:string,id:string}) => {
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  const response = await axios.put(API_URL+id, studentData,config)
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