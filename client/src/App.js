import React,{useEffect} from 'react';
// css
import "./App.css";
import 'antd/dist/antd.css';
import "bootstrap/dist/css/bootstrap.min.css";
//Notify
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//component
import Navbar from "./components/layouts/Navbar"
//router
import { Switch, Route} from "react-router-dom";
import UserRoute from "./components/routes/UserRoute"
import AdminRoute from "./components/routes/AdminRoute"

//page
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Regi";
import Home from "./components/pages/Home";
import AdminDashboard from "./components/pages/admin/AdminDashboard"
import UserDashboard from "./components/pages/user/UserDashboard"
import AdminCreatePerson from './components/pages/admin/AdminCreatePerson';
import Adminupdate from "./components/pages/admin/Adminupdate"
//redux
import {useDispatch } from "react-redux";
//function
import { currentUser} from "./components/functions/auth"


function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    const idTokenResult = localStorage.token;
    if(idTokenResult){
      currentUser(idTokenResult)
        .then((res)=>{
          // console.log("app",res);
          dispatch({
            type:"LOGGED_IN_USER",
            payload:{
              name:res.data.name,
              token:idTokenResult,
              role:res.data.role,
              id:res.data._id
            }
          })
        })
        .catch((err)=>{
          console.log(err);
        })
    }
  },[dispatch]);

  return (
    <div className="App">
      <Navbar/>
      <ToastContainer/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/create-person" component={AdminCreatePerson} />
        <AdminRoute exact path="/admin/update-person/:id" component={Adminupdate} />
        
        <UserRoute exact path="/user/dashboard" component={UserDashboard} />
      </Switch>
    </div>
  );
}

export default App;
