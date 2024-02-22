// auth.js

export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if(token){
        return true
    }else{
        return false
    }
  };
  
  export const logout = () => {
    localStorage.removeItem("token");
  };
  