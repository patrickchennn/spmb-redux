import axios from "axios";
const API_URL = "/api/user/";

// Register user
interface UserData{
  name:string,
  email:string,
  password:string,  
}
const register = async (userData: UserData) => {
  const response = await axios.post(API_URL+"register",userData);
  console.log(response);

  if(response.status===201){
    localStorage.setItem("user",JSON.stringify(response.data));
  }
  return response.data;
};


// Logout user
const logout = () => localStorage.removeItem("user");


// Login user
interface LoginUserData{
  email:string,
  password:string
};
const login = async(loginUserData: LoginUserData) => {
  const response = await axios.post(API_URL+"login",loginUserData);
  if(response.status===201){
    // console.log("login success!:\n",response);
    localStorage.setItem("user",JSON.stringify(response.data));
  }
  return response.data;
};

const authService = { register,logout,login, };

export default authService;