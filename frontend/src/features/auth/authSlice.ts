import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from localStorage
// we will use this to check if the user already register or login
// if the user already register or login, then we will just navigate to /spmb-form. See the code at spmb-form.tsx
interface User{
  email:string,
  name:string,
  _id:string,
  token:string,
}
const user: User | null = JSON.parse(localStorage.getItem("user")!);


interface InitialState{
  user: User | null
  isLoading: boolean,
  isSuccess: boolean,
  isError: boolean,
  message: string
}
const initialState: InitialState = {
  user: user ? user : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const authSlice = createSlice({
  // domain 
  name:"auth",
  initialState,
  // actions
  reducers:{
    // action type
    // reset the state to default :)
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    // Logout user
    logout: (state) => {
      authService.logout();
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, state => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state,action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
        state.user = null
      })
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.rejected,(state,action) => {
        state.isSuccess = false
        state.isError = true
        state.message = action.payload as string
        state.user = null
      })
      .addCase(login.fulfilled,(state,action) => {
        state.isSuccess = true
        state.isLoading = false
        state.user = action.payload
      })
  }
});

// Register user
interface UserData{
  name:string,
  email:string,
  password:string,  
}
const register = createAsyncThunk(
  "auth/register",
  async (userData: UserData,thunkAPI) => {
    try {
      return await authService.register(userData)
    } catch (error: any) {
      // console.log(error)
      const errMsg: string = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
);


// Login user
interface LoginUserData{
  email:string,
  password:string
}
const login = createAsyncThunk(
  "auth/login",
  async (loginUserData: LoginUserData, thunkAPI) => {
    try {
      return await authService.login(loginUserData);
    } catch (error: any) {
      // console.log(error);
      const errMsg: string = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
)


console.log(authSlice);

export {login,register}
export const {reset,logout} = authSlice.actions;
export default authSlice.reducer;