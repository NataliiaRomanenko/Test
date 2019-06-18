import React from 'react';
import ReactDOM from 'react-dom';
import '../public/css/index.css';
import App from './app.js';
import {BrowserRouter} from "react-router-dom";


ReactDOM.render(
    <BrowserRouter>
            <App/>
    </BrowserRouter>, document.getElementById('root')
)


if(module.hot) {module.hot.accept();}
