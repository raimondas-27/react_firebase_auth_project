import React, {useState, useContext, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import classes from './AuthForm.module.css';
import AuthContext from "../../store/auth-context";
import {sendData} from "../../utils/requests";
import {toast} from "react-toastify";



const AuthForm = () => {

   let history = useHistory();

   const authCtx = useContext(AuthContext);

   const [isLogin, setIsLogin] = useState(true);

   useEffect(() => {
      return () => {
         setIsLogin(true);
      };
   }, []);


   const switchAuthModeHandler = () => {
      setIsLogin((prevState) => !prevState);
   };

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isLoading, setIsLoading] = useState(false);


   const submitHandler = async (event) => {
      event.preventDefault();
      console.log('sending');
      setIsLoading(true);

      let url;
      if (isLogin) {

         console.log('Login action');
         url =
             'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
      }
      if (!isLogin) {
         url =
             'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
      }

      const response = await sendData(
          url,
          {
             email: email,
             password: password,
             returnSecureToken: true,
          }
      );
      if (response) {
         authCtx.login(response.data.idToken)
         setIsLoading(false);
         history.replace("/")
         toast.success("login was successful");

         return;
      }
      setIsLoading(false);
   };

   return (
       <section className={classes.auth}>
          <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
          <form onSubmit={submitHandler}>
             <div className={classes.control}>
                <label htmlFor='email'>Your Email</label>
                <input value={email}
                       onChange={(event) => setEmail(event.target.value)}
                       type='email'
                       id='email'
                       required
                />
             </div>
             <div className={classes.control}>
                <label htmlFor='password'>Your Password</label>
                <input value={password}
                       minLength={3}
                       onChange={(event) => setPassword(event.target.value)}
                       type='password'
                       id='password'
                       required
                />
             </div>
             <div className={classes.actions}>
                {isLoading ? <button disabled> Loading </button> :
                    <button>{isLogin ? 'Login' : 'Create Account'}</button>}
                <button
                    type='button'
                    className={classes.toggle}
                    onClick={switchAuthModeHandler}
                >
                   {isLogin ? 'Create new account' : 'Login with existing account'}
                </button>
             </div>
          </form>
       </section>
   );
};

export default AuthForm;
