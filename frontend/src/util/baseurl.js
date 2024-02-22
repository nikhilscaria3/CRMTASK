import axios from "axios";

const baseURL = "https://crmtask.vercel.app/";

 const axiosInstance = axios.create({
  baseURL: baseURL,
});


const setAuthToken = () => {
  const token =  localStorage.getItem("token")
  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};


// eslint-disable-next-line import/no-anonymous-default-export
export {axiosInstance,setAuthToken};