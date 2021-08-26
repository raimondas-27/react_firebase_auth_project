import React, {useState} from "react";


const AuthContext = React.createContext({
   token: "",
   isLoggedIn: false,
   login: (token) => {
   },
   logout: () => {
   },
});


export const AuthContextProvider = (props) => {

   const tokenExists = localStorage.getItem("firebase-token");


   const [token, setToken] = useState(tokenExists);
   const isLoggedIn = !!token;


   const loginHandler = (token) => {
      setToken(token);
      localStorage.setItem("firebase-token", token)
      console.log("loginHandler ran in Provider")
   }

   const logoutHandler = () => {
      localStorage.removeItem("firebase-token");
      setToken(null);

   }

   const contextValue = {
      token: token,
      isLoggedIn: isLoggedIn,
      login: loginHandler,
      logout: logoutHandler,
   }

   return (
       <AuthContext.Provider value={contextValue}>
          {props.children}
       </AuthContext.Provider>
   )
}

export default AuthContext;