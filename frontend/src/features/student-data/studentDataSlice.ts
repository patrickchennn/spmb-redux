import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import studentDataService from "./studentDataService"

const initialState = {
  studentData: {
    dataDiri: {
      kewarnegaraan: "",
      namaLengkap: "",
      jenisKelamin: "",
      tanggalLahir: new Date().toLocaleDateString('en-CA'),
      tempatKotaLahir: "",
      alamatEmail: "",
      noHp: "",
    },
    berkasAdministrasi: {
      fotoCopyKartuKeluarga:{
        namaFoto: null,
        data: null,
        mimeType: null,
      },
      fotoCopyIjazah:{
        namaFoto: null,
        data: null,
        mimeType: null,
      },
      fotoCopyPrestasi:{
        namaFoto: null,
        data: null,
        mimeType: null,
      },
      pasFoto:{
        namaFoto: null,
        data: null,
        mimeType: null,
      },
    },
    infoSeleksi:{
      tanggalSeleksi: new Date().toLocaleDateString('en-CA'),
      buktiPembayaranSeleksi:{
        namaFoto: null,
        data: null,
        mimeType: null,
      },
      statusPembarayanSeleksi:"",
      statusPenerimaanSeleksi:"",
      prodi:""
    },
    daftarUlang: {
      buktiPembayaranDaftarUlang:{
        namaFoto: null,
        data: null,
        mimeType: null,
      },
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
  }
})

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

export {createStudentDataDefault}
export default studentDataSlice.reducer