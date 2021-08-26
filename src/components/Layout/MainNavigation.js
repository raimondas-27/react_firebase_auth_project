import React, {useContext, useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import classes from './MainNavigation.module.css';
import AuthContext from "../../store/auth-context";
import {sendData} from "../../utils/requests";


const MainNavigation = () => {

   const authCtx = useContext(AuthContext);
   const isLoggedIn = authCtx.isLoggedIn;
   const [emailLogo, setEmailLogo] = useState("")


   const url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=';

   useEffect(() => {
      (async () => {
         const response = await sendData(url, {idToken: authCtx.token});

         if (response) {
            setEmailLogo(response.data.users[0].email)
         }
      })();
   }, [authCtx.token, ]);


   return (
       <header className={classes.header}>

          <Link to='/'>
             <div className={classes.logo}>React Auth</div>
          </Link>
          <Link to='/'>
             <div className={classes.email}>{emailLogo}</div>
          </Link>
          <nav>
             <ul>
                {!isLoggedIn && (
                    <li>
                       <Link to='/auth'>Login</Link>
                    </li>
                )};
                {isLoggedIn && (
                    <li>
                       <Link to='/profile'>Profile</Link>
                    </li>
                )};
                {isLoggedIn && (
                    <li>
                       <button onClick={authCtx.logout}>Logout</button>
                    </li>)}
             </ul>
          </nav>
       </header>
   );
};

export default MainNavigation;
