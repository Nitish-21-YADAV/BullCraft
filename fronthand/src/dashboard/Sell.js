import React, { useEffect } from 'react';
import { watchlist } from './data/data'
import { useState } from 'react';
import { handleError,handleSuccess } from '../Util';
function Sell() {

    const [holding,setHolding]=useState([])
    const userId =localStorage.getItem("UserId");

    useEffect( ()=>{
        const holdingData = async()=> {
        const response= await fetch(`http://localhost:3000/gettingHolding?userId=${userId}`);
        const data = await response.json();
        setHolding(data);
        }
        holdingData();
    },[])
    console.log(holding);

    const [selectedShare, setSelectedShare] = useState('');
    const [qntyValue, setQntyValue] = useState()
    const handleChange = (event) => {
        const shareName = event.target.value;
        const share = holding.find((item) => item.name === shareName);
        setSelectedShare(share)

    }
    const handleQnty = (e) => {


        const Qty = Number(e.target.value);
        setQntyValue(Qty)
        console.log("Qty from from ",Qty);
        console.log("Qty from from ",selectedShare.qty);
        
    }
    
    const handleSell = async(req,res)=>{
        if(qntyValue<=selectedShare.qty){
            const sellData={
                userId,
                qty:qntyValue,
                name:selectedShare.name
            }
            console.log(sellData);
            try{
                const response = await fetch(`${process.env.REACT_APP_Backhand_URL}/SellingShare`,
                    {
                        method:"POST",
                        headers:{
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify(sellData)
                    });
                    const result= await response.json()
                    if (result.success) {
                        handleSuccess(result.message);
                    } else {
                        handleError(result.message);
                    }
            }
            catch (error) {
                handleError('Error in Selling Try After some time');
            }
            
        }
        else{
            handleError('You Have Less Amount Of Share To Sell.');
        }
            
    }

    const TotalAmount = selectedShare ? selectedShare.price * qntyValue : 0;

    return (
    <div className='parent' style={{marginTop:"9vh",alignItems:"center",margin:"4vh 2vw 30px 2vw",borderRadius:"10px",backgroundColor:"rgba(24, 24, 24, 0.792)"}}>
        <div className='row g-1 px-5 ' style={{marginTop:"15vh",alignItems:"center"}}>
            <div class="col-md-5">
                <label for="inputState" class="form-label">Select Share </label>
                <select id="inputState" class="form-select" onChange={handleChange}>
                    <option selected disabled hidden>Select Share</option>
                    {holding.map((share, index) => (
                        <option key={index} value={share.name}>{share.name}</option>
                    ))}
                </select>
            </div>
          
                <div class="col-md-5">
                    <label htmlFor="inputPrice" className="form-label">Share Price</label>
                    <div className="form-control" id="inputPrice" style={{height:"6vh"}}>{selectedShare.price}</div>
                </div>
                
            <div class="col-md-5">
                <label htmlFor="inputPrice" className="form-label">Qnty </label>
                <input className="form-control" id="inputPrice" onChange={handleQnty}></input>
            </div>
            <div class="col-md-5">
                <label htmlFor="inputPrice" className="form-label">Total Amount</label>
                <div className="form-control" id="inputPrice">{TotalAmount}</div>
            </div>
            
        </div>
        <button className='btn px-4 py-2' onClick={handleSell} style={{width:"max-content",fontSize:"20px",borderRadius:"10px",alignItems:"center",textAlign:"center",margin:"5vh 45%"}}>Sell</button>
        </div>    
);
}

export default Sell;