import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import studentDataService from "./studentDataService"

const initialState = {
  studentData: {
    dataDiri: {
      kewarganegaraan: "",
      namaLengkap: "",
      jenisKelamin: "",
      tanggalLahir: new Date().toLocaleDateString('en-CA'),
      tempatKotaLahir: "",
      alamatEmail: "",
      noHp: "",
    },
    berkasAdministrasi: {
      fotoCopyKartuKeluarga: null,
      fotoCopyIjazah: null,
      fotoCopyPrestasi: null,
      fotoCopyUAN:null,
      pasFoto: null,
    },
    infoSeleksi:{
      tanggalSeleksi: new Date().toLocaleDateString('en-CA'),
      buktiPembayaranSeleksi: null,
      statusPembarayanSeleksi:"",
      statusPenerimaanSeleksi:"",
      prodi:""
    },
    daftarUlang: {
      buktiPembayaranDaftarUlang: null,
      statusPembayaranDaftarUlang: null
    },
    tanggalRegistrasi:new Date().toLocaleString(),
  },
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
}
const studentDataSlice = createSlice({
  name: "studentData",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ""
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStudentDataDefault.pending, state => {
        state.isLoading = true;
      })
      .addCase(createStudentDataDefault.fulfilled, (state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.studentData = action.payload
      })
      .addCase(createStudentDataDefault.rejected, (state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
      })
      .addCase(getStudentData.pending, state => {
        state.isLoading = true;
      })
      .addCase(getStudentData.fulfilled, (state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.studentData = action.payload
        state.message = "Successfully fetch your data from the database!"
      })
      .addCase(getStudentData.rejected, (state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
      })
      .addCase(updateStudentData.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateStudentData.fulfilled, (state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.studentData = action.payload
      })
      .addCase(updateStudentData.rejected, (state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
      })
  }
})

// create student collection with default value
const createStudentDataDefault = createAsyncThunk(
  "studentData/createStudentDataDefault",
  async({email,token}: {email:string,token:string}, thunkAPI) => {
    try {
      return await studentDataService.createStudentDataDefault({email,token})
    } catch (error: any) {
      const errMsg: string = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
)

// Update student data
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
const updateStudentData = createAsyncThunk(
  "studentData/update",
  async (bioData: BioData, thunkAPI) => {
    try {
      const {token,_id} = JSON.parse(localStorage.getItem("user")!)
      return await studentDataService.updateStudentData(bioData, {token,id: _id})
    } catch (error: any) {
      const errMsg: string = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
)


// Fetch student data
const getStudentData = createAsyncThunk(
  "studentData/get",
  async(_,thunkAPI) => {
    try {
      const {token,_id} = JSON.parse(localStorage.getItem("user")!)
      return await studentDataService.getStudentData({token,id: _id})
    } catch (error: any) {
      const errMsg: string = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
)
export {createStudentDataDefault, updateStudentData,getStudentData}
export const {reset} = studentDataSlice.actions
export default studentDataSlice.reducer