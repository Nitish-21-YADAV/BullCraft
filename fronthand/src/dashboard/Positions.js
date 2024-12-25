import React, { useEffect, useState } from "react";
import '../dashboard.css'
import axios from "axios";

import { positions } from "./data/data";

const Positions = () => {

  const [positionsData,setPositionData]=useState([]);

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_Backhand_URL}/gettingPosition`).then(res=>{
      setPositionData(res.data);
    })
  },[]);

  return (
    <>
      <h3 className="title">Positions ({positionsData.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>

          {positionsData.map((stock,index)=>{
             const curValue =stock.price*stock.qty;
             const isProfit=curValue-stock.avg*stock.qty;
             const profClass = isProfit>0.0?"profit":"loss";
             const dayClass=stock.isLoss?"loss":"profit";

             return(
              <tr key={index}>
              <td>{stock.product}</td>
              <td>{stock.name}</td>
              <td>{stock.qty}</td>
              <td>{stock.avg}</td>
              <td >{(stock.price).toFixed(3)}</td>
              <td className={profClass}>{(isProfit).toFixed(3)}</td>
              <td className={dayClass}>{stock.day}</td>
            </tr>
             )
          })}

        </table>
      </div>
    </>
  );
};

export default Positions;