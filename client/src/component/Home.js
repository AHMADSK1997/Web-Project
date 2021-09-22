import React, { Component } from 'react';
import BTCUSDT from '../views/BTCUSDT'
import ETHUSDT from '../views/ETHUSDT'
import axios from 'axios'
import logo from '../image/logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    const search = props.location.search; // returns the URL query String
    const params = new URLSearchParams(search); 
    const myEmail = params.get('email');
    this.state = {USD : "loading...",
                  BTC : 0, 
                  ETH : 0, 
                  liveBtc: 0 , 
                  liveEth: 0 , 
                  Invest : 0 , 
                  email : myEmail,
                  isDisabled: false
                }
    axios.post('http://localhost:5000/app/getData',{email:myEmail})
    .then(response=>{
      var isDisable = false
      if(response.data.invest !== "0"){
        isDisable =  true
      }
      this.setState({BTC : response.data.btc, ETH : response.data.eth, Invest : response.data.invest ,isDisabled : isDisable})
    })
    this.interval = setInterval(() =>this.updateData(), 1000);
  }
 
  componentDidMount =()=> {
    window.addEventListener('beforeunload', this.savedata)
  }

  componentWillUnmount=()=> {
    window.removeEventListener('beforeunload', this.savedata)
  }

  savedata=(e)=> {
    e.preventDefault()
    const data={
        email: this.state.email,
        btc : this.state.BTC,
        eth : this.state.ETH,
        invest : this.state.Invest
    }
    axios.post('http://localhost:5000/app/saveData',data)
    .then(response=>{console.log("saved data") })
  }
 

  closeTrade = async() =>{
    var ratio = Number(this.state.BTC)*50/100
    var newbtc = Number(this.state.BTC)*50/100
    var eth = Number(this.state.ETH)
    this.myInvest = React.createRef()
    if(this.state.USD===0){
      alert("please set amount to invest")
    }
    this.setState({USD: "loading...", BTC: "loading...", ETH: "loading..."})
    var usd = ratio*this.state.liveBtc
    var neweth = usd/this.state.liveEth + eth
    var dollar = this.state.liveBtc*newbtc +this.state.liveEth*neweth
    this.setState({USD: dollar, BTC: newbtc, ETH: neweth})
    }

    openTrade = async () =>{
    var ratio = Number(this.state.ETH)*50/100
    var neweth = Number(this.state.ETH)*50/100
    var btc = Number(this.state.BTC)
    if(this.state.USD===0){
      alert("please set amount to invest")
    }
    this.setState({USD: "loading...", BTC: "loading...", ETH: "loading..."})
    this.myInvest = React.createRef()
    var usd = ratio*this.state.liveEth
    var newbtc = usd/this.state.liveBtc + btc
    var dollar = this.state.liveBtc*newbtc +this.state.liveEth*neweth
    this.setState({USD: dollar, BTC: newbtc, ETH: neweth}) 
   }

   stop = () =>{
    this.setState ( {USD : 0,
    BTC : 0, 
    ETH : 0, 
    Invest : 0 , 
    isDisabled: false
  })
   }
    setInvest=(event)=>{
      this.setState({Invest: event.target.value})
    }

    submit = async(event)=>{
      if(this.state.Invest<=0){
        alert("Please enter a number that's greater than 0")
      }
      else{
      this.setState({USD: "loading...", BTC: "loading...", ETH: "loading..."})
      var dollar = this.state.Invest
      var mad = dollar/2
      var btc=mad/this.state.liveBtc
      var eth=mad/this.state.liveEth
      
      this.setState({USD: dollar, BTC: btc, ETH: eth, isDisabled: true})}
    }
    updateUSD = async() => {
      if(this.state.BTC !== "loading..." && this.state.ETH !== "loading...")
      {
      var livebtc= this.state.liveBtc 
      var liveeth= this.state.liveEth 
      var btc= this.state.BTC 
      var eth= this.state.ETH 
      var dollar = livebtc*btc +liveeth*eth
      this.setState({USD: dollar})
    }
    }
    updateData = async() => {
      const response = await fetch('/getPriceBTC')
      const BTCbody = await response.json()
      if (response.status !== 200) {
        throw Error(BTCbody.message) 
      }
      const res = await fetch('/getPriceETH')
      const ETHbody = await res.json()
      if (res.status !== 200) {
        throw Error(ETHbody.message) 
      }
      this.setState({liveBtc:BTCbody, liveEth:ETHbody})
      if(this.state.BTC !== "loading..." && this.state.ETH !== "loading...")
      {
      var livebtc= this.state.liveBtc 
      var liveeth= this.state.liveEth 
      var btc= this.state.BTC 
      var eth= this.state.ETH 
      var dollar = livebtc*btc +liveeth*eth
      this.setState({USD: dollar})
      }
    }
    render() {    
      const buttonCircle={
        width: '190px',
        height: '40px',
        padding: '10px 16px',
        fontSize: '14px',
        textAlign: 'center',
        fontWeight: 'bold',
        margin: '10px'
      }
      return (
        <div className="home-template">

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <img src={logo} width="60" height="60" ALIGN="CENTER"  alt="Logo"/>

          <div className="navbar-brand" fontSize="30">Pairs Trading</div>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" onClick={()=>window.location.href =`http://localhost:3000/sign-in`}>Log out</Link>
              </li>
            </ul>
      </nav>
          <table className="table"> 
            <tbody>
              <tr>
                <td><BTCUSDT></BTCUSDT></td>
              </tr>
              <tr>
                <td><ETHUSDT></ETHUSDT></td>
              </tr>
            </tbody>
          </table>
  <form className="form-Trade ">   
  <h2 className="text-primary">Pairs Trading</h2>
  
  <div className="form-group row">
  <input type="number" min="0.00" step="0.1" value={this.state.Invest} style ={buttonCircle} onChange={this.setInvest} disabled={this.state.isDisabled}/>
  <button type="button" className="btn btn-primary btn-xl" style ={buttonCircle} onClick={this.submit} disabled={this.state.isDisabled}> invest amount in dollar</button>
  </div>

  <div className="form-  row">
  <label class="col-sm-2 col-form-label">BTC : </label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control-plaintext"  value={this.state.BTC}></input>
    </div>
    <label class="col-sm-2 col-form-label">ETH : </label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control-plaintext" value={this.state.ETH}></input>
    </div> 
    <label class="col-sm-2 col-form-label">Portfolio : </label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control-plaintext" value={this.state.USD}></input>
    </div> 
    </div>
  <div className="row">
      <button type="button" className="btn btn-success btn-xl"style ={buttonCircle} onClick={this.openTrade}>Buy BTC and Sell ETH</button>
      <button type="button" className="btn btn-success btn-xl"style ={buttonCircle} onClick={this.closeTrade} >Sell BTC and Buy ETH</button>
      <button type="button" className="btn btn-danger btn-xl"style ={buttonCircle} onClick={this.stop} >Stop</button>

  </div>
  
  </form> </div>  
      )
    }
  }

  export default Home;

