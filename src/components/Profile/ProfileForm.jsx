import React from "react";
import {useState, useContext} from "react";
import classes from './ProfileForm.module.css';
import AuthContext from "../../store/auth-context";
import {sendData} from "../../utils/requests";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";



const ProfileForm = () => {

   //history

   let history = useHistory();

   //context

   const authCtx = useContext(AuthContext);

   //gauti input reiksme
   const [password, setpassword] = useState("")
   const [name, setName] = useState("");

   //perrimti formos valdyma

   const submitHandler = async (event) => {
      event.preventDefault();
      console.log(password);
      const response = await sendData(
          'https://identitytoolkit.googleapis.com/v1/accounts:update?key=',
          {
             idToken: authCtx.token,
             password: password,
             returnSecureToken: true,
          }
      );

      if (response) {
         history.push("/")
         toast.info("password was changed");
      }
   }

   //issiusti post requesta i nurodyta endpointa


   return (
          <div>
             <form onSubmit={submitHandler} className={classes.form}>
                <div className={classes.control}>
                   <label htmlFor='new-password'>New Password</label>
                   <input value={password}
                          onChange={(event) => setpassword(event.target.value)}
                          type='password'
                          id='new-password'
                   />
                </div>
                <div className={classes.action}>
                   <button>Change Password</button>
                </div>
             </form>
             <div className={classes.control}>
                <label htmlFor='new-password'>Your new name</label>
                <input value={name}
                       onChange={(event) => setName(event.target.value)}
                       type='name'
                       id='name'
                />
                <button> Change name </button>
             </div>
          </div>
   )
       ;
}

export default ProfileForm;
