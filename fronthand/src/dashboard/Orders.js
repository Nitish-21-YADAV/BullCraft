import React,{useState,useEffect} from "react";
import '../dashboard.css'
import axios from "axios";

const Orders = () => {

  const [holdingData,setHoldingData]=useState([]);
  const userId =localStorage.getItem("UserId");
  useEffect(()=>{
    console.log(userId);
      axios.get(`${process.env.REACT_APP_Backhand_URL}/gettingOrders`,{params:{userId},}).then(res=>{
        setHoldingData(res.data);
      })
  },[userId]);

  let totalInv=0
  let totalCrv=0
  let totalPl=0
  
  holdingData.forEach((stock)=>{
    const stockInv= stock.avg*stock.price;
    const stockCrv=stock.price*stock.qty
    const Stockpl=(stockCrv-(stock.avg*stock.qty));
    totalCrv +=stockCrv;
    totalInv +=stockInv;
    totalPl+=Stockpl;
  })
  totalInv=totalInv.toFixed(2)
  totalCrv=totalCrv.toFixed(2)
  totalPl=totalPl.toFixed(3)
  let totalpercentage=((totalPl/totalInv)*100).toFixed(2);
  console.log(totalpercentage);

  return (
    <>
      <h3 className="title">Orders ({holdingData.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Value</th>
            <th>P&L</th>
            <th>Type</th>
          </tr>
          
          {holdingData.map((stock,index)=>{
            const curValue =(stock.price*stock.qty);
            const isProfit=(curValue-(stock.avg*stock.qty));
            const profClass = isProfit>0.0?"profit":"loss";
            const dayClass=stock.isLoss?"loss":"profit";
            const stockavg= ((stock.price*stock.qty)/stock.qty);

            return(
              <tr key={index}>
              <td>{stock.name}</td>
              <td>{stock.qty}</td>
              <td>{stockavg.toFixed(2)}</td>
              <td>{stock.price}</td>
              <td>{(curValue).toFixed(3)}</td>
              <td className={profClass}>{(isProfit).toFixed(2)}</td>
              <td className={profClass}>{stock.bs}</td>
            </tr>
            )
          }
          )}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
          
          {totalInv}{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            {totalCrv}{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col" >
          <h5 className={totalPl > 0.0 ? "profit" : "loss"}>{totalPl} ({totalpercentage}%)</h5>

          <p>P&L</p>
        </div>
      </div>
     
    </>
  );
};

export default Orders;