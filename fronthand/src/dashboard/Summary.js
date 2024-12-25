import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";
import '../dashboard.css'

const Summary = () => {


  const [holdingData,setHoldingData]=useState([]);
  const userId =localStorage.getItem("UserId");
  useEffect(()=>{

    
    axios.get(`${process.env.REACT_APP_Backhand_URL}/gettingHolding`,{params:{userId},}).then(res=>{
        setHoldingData(res.data);
      })
  },[userId]);

  const labels = holdingData.map((subArray) => subArray["name"]);

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

  const [userName, setUserName] = useState('')
    useEffect(() => {
        const storageName = localStorage.getItem('loggedInUser')
    
        if (storageName) {
            setUserName(storageName)
        }
    }, []);
  return (
    <>
      <div className="username">
      <h1>Welcome  <span> {userName}</span>,</h1>
      <p className="greeting-text px-5 py-2" style={{ alignItems: "center", textAlign: "center" }}>Welcome back! 🌟 Ready to make the most of today's opportunities? With BullCraft, you're in control—track trends, maximize your portfolio, and make informed decisions.</p>
        <hr className="divider" />
      </div>

      <div className="section">
  <span>
    <p>Market Insights</p>
  </span>

  <div className="data" id="newSeconddiv" style={{display:"flex",width:"70%",alignItems:"center",justifyContent:"center"}}>
    <div className="first" style={{alignItems:"center",margin:"0 auto"}}>
      <h3>Uptrend in Tech Stocks</h3>
      <p>Take advantage of recent movements in tech sector stocks.</p>
    </div>
    <hr />

    <div className="second">
      <p>
        Market Summary: <span>Positive</span>{" "}
      </p>
      <p>
        Recommended Action: <span>Buy</span>{" "}
      </p>
    </div>
  </div>
  <hr className="divider" />
</div>
<div className="section">
        <span>
          <p>Holdings ({holdingData.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className="profit">
              {totalPl} <small>{totalpercentage}%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{totalCrv}</span>{" "}
            </p>
            <p>
              Investment <span>{totalInv}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;