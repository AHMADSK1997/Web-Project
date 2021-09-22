import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            email:'',
            password:''
        }
    }
    changeEmail=(event)=>{
        this.setState({
            email:event.target.value
        })
    }
    changePassword=(event)=>{
        this.setState({
            password:event.target.value
        })
    }

    onSubmit=(event)=>{
        event.preventDefault()
        const login={
            email: this.state.email,
            password: this.state.password
        }
        axios.post('http://localhost:5000/app/login',login)
        .then(response=>{
            if (response.data.Success=="Success!"){
                window.location.href =`http://localhost:3000/Home?email=${login.email}`
            }
            else{
                alert("Password or Email is uncurrect")
            }
        })
        //window.location='/Home'
    }
    render() {
        return (
            <form className='form-template' onSubmit={this.onSubmit}>

                <h3>Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email"
                     className="form-control" 
                     placeholder="Enter email"
                     onChange={this.changeEmail}
                     value={this.state.email}
                      />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password"
                     className="form-control"
                      placeholder="Enter password"
                      onChange={this.changePassword}
                      value={this.state.password}
                       />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                <p className="forgot-password text-right">
                    
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                </p>
            </form>
        );
    }
}
export default Login;
