import React, { useEffect, useState } from "react";
import '../dashboard.css'
import { watchlist } from "./data/data";
import { Navigate, useNavigate } from "react-router-dom";

import {KeyboardArrowUp,KeyboardArrowDown, BarChartOutlined, MoreHoriz} from '@mui/icons-material'
import { Tooltip,Grow } from "@mui/material";
import {Button} from '@mui/material/Button';
const WatchList = () => {
  const [stocks, setStocks] = useState([]);
  useEffect(()=>{
    const fetchstock= async ()=>{
      try{
        const response =await fetch(`${process.env.REACT_APP_Backhand_URL}/stocks`);
        const data = await response.json()
        setStocks(data)
      }
      catch(error){
        console.log(error);
        
      }
    }
    fetchstock();
  },[])

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <label style={{color:"White",fontSize:"1.2rem"}}><span style={{color:"rgb(245, 104, 52)"}}>WatchList </span>Shares</label>
        <span className="counts"> {stocks.length}</span>
      </div>

      <ul className="list">
        {stocks.map((stock,index)=>{
          return(
          <WatchListItem stock={stock} key={index}/>)
        })}
      </ul>
    </div> 
  );
};

export default WatchList;

const WatchListItem = ({stock})=>{
  const [showWatchListAction,setShowWatchListAction]=useState(false); 
  
  const handleMouseEnter=(e)=>{
    setShowWatchListAction(true);
  }
  const handleMouseLeave=(e)=>{
    setShowWatchListAction(false);
  }


  return(
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={stock.isLoss?"down":"up"}>{stock.name}</p>
        <div className="item-info">
          <span className="percent">{stock.day}</span>
          {stock.isLoss ?(<KeyboardArrowDown className="down"/>):<KeyboardArrowUp className="up"/>}
          <p className={stock.isLoss?"down":"up"}>{stock.price }</p>
        </div>
      </div>
      {showWatchListAction && <WatchListActions uid={stock.name}/>}
    </li>
  )
}

const WatchListActions =({uid})=>{
  const navigate=useNavigate();
  const handleBuy=()=>{
    navigate("/dashboard/Buy")
  }
  const handleSell=()=>{
    navigate("/dashboard/Sell")
  }
  return(
    <span className="actions">
        <span>
        <Tooltip title="Buy (B)"  arrow>
          <button className="buy" onClick={handleBuy}>Buy</button>
        </Tooltip>
        <Tooltip title="Sell (S)"  arrow>
          <button className="sell" onClick={handleSell}>Sell</button>
        </Tooltip>
        <Tooltip title="More"  arrow>
          <button className="action">
            <MoreHoriz className="icon"/>
          </button>
        </Tooltip>
        </span>
    </span>
  )
}