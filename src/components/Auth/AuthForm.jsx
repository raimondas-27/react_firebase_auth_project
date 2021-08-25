import {useState} from 'react';
import axios from "axios";
import classes from './AuthForm.module.css';
import {apiKey} from "../../config";


const AuthForm = () => {
   const [isLogin, setIsLogin] = useState(true);

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
             'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apiKey;
      }
      if (!isLogin) {
         url =
             'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey;
      }
      try {
         const response = await axios.post(url, {
            email: email,
            password: password,
            returnSecureToken: true,
         });
         console.log('response OK', response.data);
      } catch (error) {
         console.log('Catch block');
         console.log(error.response.data.error.message);
         alert('Error: ' + error.response.data.error.message);
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
