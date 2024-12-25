import React,{useState,useEffect} from "react";
import '../dashboard.css'
import axios from "axios";
import { VerticalGraph } from "./VerticlGraph";

const Holdings = () => {
  
  const [holdingData,setHoldingData]=useState([]);
  const userId =localStorage.getItem("UserId");
  useEffect(()=>{
    console.log(userId);
      axios.get(`${process.env.REACT_APP_Backhand_URL}/gettingHolding`,{params:{userId},}).then(res=>{
        setHoldingData(res.data);
      })
  },[userId]);

  const labels = holdingData.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: holdingData.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

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
  // setTotalInvestment(totalInv)
  

  return (
    <>
      <h3 className="title">Holdings ({holdingData.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
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
              <td className={profClass}>{stock.net}</td>
              <td className={dayClass}>{stock.day}</td>
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
        <div className="col">
          <h5>{totalPl} ({totalpercentage}%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data}/>
    </>
  );
};

export default Holdings;