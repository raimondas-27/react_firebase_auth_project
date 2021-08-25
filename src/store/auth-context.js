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

   const [token, setToken] = useState("");
   const isLoggedIn = !!token;

   const loginHandler = (token) => {
      setToken(token);
      console.log("loginHandler ran in Provider")
   }

   const logoutHandler = () => {
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