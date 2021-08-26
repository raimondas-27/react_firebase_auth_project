import React, {useContext} from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from "./store/auth-context";


function App() {

   const {isLoggedIn} = useContext(AuthContext)

   return (
       <div>
          <ToastContainer/>
          <Layout>
             <Switch>
                {isLoggedIn &&
                (<Route path='/' exact>
                       <HomePage/>
                    </Route>
                )}
                {!isLoggedIn && (
                    <Route path='/auth'>
                       <AuthPage/>
                    </Route>
                )}
                {isLoggedIn && (
                    <Route path='/profile'>
                       <UserProfile/>
                    </Route>
                )}
                <Route path="*">
                   <Redirect to="/auth" />
                </Route>
             </Switch>
          </Layout>
       </div>
   );
}

export default App;
