import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Table from './components/Table';
import Stocks from './components/Stocks';

class App extends Component {

   render() {

      return (
         <div className='App'>
            <Navbar />
            <Table />
            <Stocks />
         </div>
      )
   }
}

export default App;
