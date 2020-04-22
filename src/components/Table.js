import React, { Component } from 'react';
import './Table.css';
import axios from 'axios';
import AlphaCall from './AlphaCall';

class Table extends Component {

   state = {
      data: [],
      count: null
   }

   componentDidMount() {

      axios.get(`https://fptracker-a11c9.firebaseio.com/active.json`)
         .then(res => {
            const stocks = res.data;
            this.setState({
               data: stocks
            });
         })
   }

   componentWillUpdate(){
      // console.log('update triggered');

      axios.get(`https://fptracker-a11c9.firebaseio.com/active.json`)
         .then(res => {
            const stocks = res.data;

            var count = 0;

            (stocks != null) && (

            count = Object.keys(stocks).length

            )

            this.setState({
               data: stocks,
               count
            });
         })
   } // Live Listener

   handleDelete = (event) => {
      console.log(event.target.id + ' button');
      var id = event.target.id;

      axios.delete(`https://fptracker-a11c9.firebaseio.com/active/${id}.json`);

      axios.post('https://fptracker-a11c9.firebaseio.com/allStocks.json', {
         symbol: this.state.data[id].symbol,
         name: this.state.data[id].name
      })
   }

   render() {

      return (

         <div className="MyStocks" id="mystocks">
            <h2>My Stocks</h2>
            <table className="MyStocksTable">
               <thead>
                  <tr>
                     <th>Stock Symbol</th>
                     <th>Stock Name</th>
                     <th>No. of shares</th>
                     <th>Buy price</th>
                     <th>Current price</th>
                     <th>Profit/Loss</th>
                     <th> </th>
                  </tr>
               </thead>
               <tbody>

                  {/* {() => {this.handleGet('MSFT','2020-03-27')}} */}

                  {
                     (this.state.data == null) ? (<tr><td><h3>NO STOCKS HAVE BEEN SELECTED</h3></td></tr>) : (
                     Object.keys(this.state.data).map((key) => {
                        return <tr key={key} id={key}>
                           <td>{this.state.data[key].symbol}</td>
                           <td>{this.state.data[key].name}</td>
                           <td>{this.state.data[key].share}</td>
                           <td>{this.state.data[key].buyprice}</td>
                           <AlphaCall
                              symbol={this.state.data[key].symbol}
                              date={this.state.data[key].date}
                              buyprice={this.state.data[key].buyprice}
                              share={this.state.data[key].share} />
                           <td>
                              <button className="StopTrackingBtn" id={key} onClick={this.handleDelete}>Stop Tracking</button>
                           </td>
                        </tr>
                     })
                     )
                  }

                  {/* profit/loss || (current price – buy price) * no. of shares. */}

                  {/* push 'buy price' and 'no of shares' to AlphaCall. 
                     Return two 'td's [current price, profit] */}

               </tbody>
            </table>
            {
               (this.state.count > 5) && (<h3>WARNING, Table should contain not more than 5 Stocks!</h3>)
               
            }
         </div>
      )
   }
}

export default Table;
