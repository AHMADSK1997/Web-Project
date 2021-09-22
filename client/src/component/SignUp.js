import React, { Component } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

export default class SignUp extends Component {
    constructor(){
        super()
        this.state = {
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            btc: '0',
            eth: '0',
            invest: '0'
        }
    }
    changeFirstName=(event)=>{
        this.setState({
            firstName:event.target.value
        })
    }
    changeLastName =(event)=>{
        this.setState({
            lastName:event.target.value
        })
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
        const registered={
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            btc : this.state.btc,
            eth : this.state.eth,
            invest : this.state.eth
        }
        axios.post('http://localhost:5000/app/signup',registered)
        .then(response=>{
            if(response.data.Success=='Exist email'){
                alert("This email is exist")
            }
            else{
                window.location.href =`http://localhost:3000/Home?email=${registered.email}`
            }
        })
    }
    render() {
        return (
            <form className='form-template' onSubmit={this.onSubmit}>
                <h3>Register</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" 
                    className="form-control" 
                    placeholder="First name" 
                    onChange={this.changeFirstName}
                    value={this.state.fullName}
                    />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text"
                     className="form-control" 
                     placeholder="Last name"
                     onChange={this.changeLastName}
                     value={this.state.lastName}
                      />
                </div>

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

                <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                <p className="forgot-password text-right">
                    Already registered 
                    <Link className="nav-link" to={"/sign-in"}>Log in?</Link>
                </p>
            </form>
        );
    }
}