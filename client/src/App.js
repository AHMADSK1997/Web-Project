import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "../src/component/Login";
import SignUp from "../src/component/SignUp";
import Home from "../src/component/Home";

function App() {
  return (<Router>
    <div className="App">
      <div className="outer">
        <div className="inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/home" component={Home} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;
/*
import React, { Component } from 'react';
import BTCUSDT from './views/BTCUSDT'
import ETHUSDT from './views/ETHUSDT'
import Portfolio from './views/Portfolio'
import Correlation from './views/Correlation'

import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from './Nav'
import SignIn from './Login' 
import Home from './Home' 
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
function App(){
  return(
    <Router>
      <div className="App">
        <Route path="/Login" component={SignIn}>
          <SignIn/>
        </Route>
        <Route path="/Home" component={Home}>
          <Home/>
        </Route>      
      </div>
    </Router>
  )
}

export default App

class App extends Component {
  render() {    
    const buttonCircle={
      width: '100px',
      height: '100px',
      padding: '10px 16px',
      borderRadius: '50px',
      fontSize: '18px',
      textAlign: 'center',
    }
    return (
      <div className="containerid">
      <nav className="navbar navbar-light bg-light" style={{ 
        backgroundImage: `url("https://nulltx.com/wp-content/uploads/2018/12/shutterstock_560758927.jpg")` ,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundPositionY: 'center',
        backgroundSize: 'cover',
        width: '100vw',
      }} >
        
        <form>     
        <div className="form-group">
            <label style={{ color: 'white', fontSize: 18,fontWeight: "bold"}}
             htmlFor="exampleInputEmail1">Email address</label>
            <input id="email" type="email" className="form-control" name="email" placeholder="Email Address" /> 
        </div>
        <div className="form-group">
          <label style={{ color: 'white', fontSize: 18,fontWeight: "bold"}}
           htmlFor="exampleInputPassword1">Password</label>
          <input id="password" type="password" className="form-control" name="password" placeholder="Password" />
          </div>
        <a className="btn btn-primary" style={{ color: 'white', fontSize: 18,fontWeight: "bold"}} href="#"><i className="fa fa-sign-in fa-lg fa-fw" />Login</a>
        <div className="row">
        <label style={{ color: 'white', fontSize: 14}}>Don't have an account ? </label>
        <label style={{ color: '#00B4FF', fontSize: 14}}>Sign Up?</label> 
        </div>

        </form>
        
      </nav>

        <table className="table"> 
          <tbody>
            <tr>
              <td><BTCUSDT></BTCUSDT></td>
              <td><ETHUSDT></ETHUSDT></td>
            </tr>
            <tr>
              <td><Portfolio></Portfolio></td>
              <td><Correlation></Correlation></td>
            </tr>
          </tbody>
        </table>
<div className="container-fluid alert alert-primary">   

<h2 className="text-primary">Pairs Trading</h2>

<div className="row"> 
<div className="col-2.5"><h5>Choose an amount to invest in dolar: </h5></div>
<div className="col-1"><input type="number" min="0.00" step="0.1" /> </div>
</div>

<div className="row">
  <div className="col-1">
    <button type="button" className="btn btn-success btn-circle btn-xl"style ={buttonCircle}>Start Trade</button>
  </div>
  <div className="col-1">
    <button type="button" className="btn btn-danger btn-circle btn-xl"style ={buttonCircle}>Stop Trade</button>
  </div>  
</div>

</div> </div>  
    )


  }
  
 
}

export default App;
*/
