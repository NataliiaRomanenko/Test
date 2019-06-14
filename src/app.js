import React, { Component } from 'react';
import logo from '../public/img/logo.svg';
import '../public/css/app.css';
import {Route} from "react-router-dom";
import Navbar from "./components/navbar";
import Header from "./components/header";
import Login from "./components/login";
import Home from "./components/home";

class App extends Component {
    constructor(props){
        super(props);
    }
  render() {
    return (
        <div className="app-wrapp">
            <Header/>
            <div className="body-wrapp">
                <Navbar/>
                <div className="body-wrapp-content">
                    <Route exact path="/" render={ () => <Home/>}/>
                    <Route path="/home" render={ () => <Home/>}/>
                    <Route path="/login" render={ () => <Login/>}/>
                </div>
            </div>
        </div>
    );
  }
}

export default App;
