import React, { useEffect } from 'react';
import { watchlist } from './data/data'
import { useState } from 'react';
import { handleSuccess, handleError } from '../Util.js'
function Buy() {
    const userId = localStorage.getItem('UserId');
    const [stocks, setStocks] = useState([]);
    const [target,setTarget]=useState();
     
    
    
    useEffect(() => {
        const fetchStocks = async () => {
            const response = await fetch("http://localhost:3000/stocks");
            const data = await response.json()
            setStocks(data);
        }
        fetchStocks();
    }, [])

    useEffect(()=>{
        const fetchTarget = async ()=>{
            const resp = await fetch("http://localhost:3000/Target?userId=${userId}");
            const targetData = await resp.json(); 
            setTarget(targetData)
        }
        fetchTarget();
    },[userId])
    console.log(target);
    
    const [targetValue,setTargetValue]=useState();
    let [selectedShare, setSelectedShare] = useState('');
    const [qntyValue, setQntyValue] = useState()
    const handleChange = (event) => {


        const shareName = event.target.value;
        console.log("hareName: ", shareName);
        const share = stocks.find((item) => item.name === shareName);
        setSelectedShare(share)


    }
    const handleQnty = (e) => {


        const Qty = Number(e.target.value);
        setQntyValue(Qty)
    }

    const handleShareBuy = async (req, res) => {
        
       
        
        const buyData = {
            userId,
            name: selectedShare.name,
            quantity: qntyValue
        }
        try {
            const response = await fetch("http://localhost:3000/BuyingShare",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(buyData)
                });

            const result = await response.json()

            if (result.success) {
                
                setSelectedShare('');
                setQntyValue('');
                handleSuccess(result.message);
            } else {
                console.log("Buy wale kaa else mai ");
                handleError(result.message);
            }

        }
        catch (error) {
            handleError('An error occurred. Please try again.');
        }

    }
    const handleTarget =(e)=>{
        const value=e.target.value;
        setTargetValue(value);
        
    }
    const handleShareTarget =async(req,res)=>{
      
        const targetData={
            userId,
            name:selectedShare.name,
            price:selectedShare.price,
            target:targetValue

        }
        const response = await fetch(`${process.env.REACT_APP_Backhand_URL}/TargetShare`,
            {
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(targetData)
            });
        const result = await response.json()
        if(result.success)
        {
            handleSuccess(result.message)
        }
        else{
            handleError(result.error)
        }
    }   

    const TotalAmount = selectedShare ? selectedShare.price * qntyValue : 0;

    return (
        <div className='parent' style={{ marginTop: "9vh", alignItems: "center", margin: "4vh 2vw 30px 2vw", borderRadius: "10px", backgroundColor: "rgba(24, 24, 24, 0.792)" }}>
            <div className='row g-1 px-5 ' style={{ marginTop: "3vh", alignItems: "center" }}>
                <div class="col-md-5">
                    <label for="inputState" class="form-label">Select Share </label>
                    <select id="inputState" class="form-select" onChange={handleChange}>
                        <option selected disabled hidden>Select Share</option>
                        {stocks.map((share, index) => (
                            <option key={index} value={share.name}>{share.name}</option>
                        ))}
                    </select>
                </div>

                <div class="col-md-5">
                    <label htmlFor="inputPrice" className="form-label">Share Price</label>
                    <div className="form-control" id="inputPrice" style={{ height: "6vh" }}>{selectedShare.price}</div>
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
            <button className='btn px-4 py-2' onClick={handleShareBuy} style={{ width: "max-content", fontSize: "20px", borderRadius: "10px", alignItems: "center", textAlign: "center", margin: "5vh 45%" }}>Buy </button>
            
            <label style={{ fontSize: "1.4rem", textAlign: "center", margin: "0 auto", width: "100%" }}>Add <span style={{ color: "#f57c00" }}>Target</span> Value </label>
            <div className='row g-1 px-5 ' style={{ marginTop: "1vh", alignItems: "center" }}>
                <div class="col-md-5">
                    <label for="inputState" class="form-label">Select Share </label>
                    <select id="inputState" class="form-select" onChange={handleChange}>
                        <option selected disabled hidden>Select Share</option>
                        {stocks.map((share, index) => (
                            <option key={index} value={share.name}>{share.name}</option>
                        ))}
                    </select>
                </div>

                <div class="col-md-5">
                    <label htmlFor="inputPrice" className="form-label">Share Price</label>
                    <div className="form-control" id="inputPrice" style={{ height: "6vh" }}>{selectedShare.price}</div>
                </div>

                <div class="col-md-5">
                    <label htmlFor="inputPrice" className="form-label">Target Price</label>
                    <input className="form-control" id="inputPrice" onChange={handleTarget}></input>
                </div>
            </div>
            <button className='btn px-4 py-2' onClick={handleShareTarget} style={{width:"max-content",fontSize:"20px",borderRadius:"10px",alignItems:"center",textAlign:"center",margin:"5vh 43%"}}>Add Target </button>

        </div>
    );
}

export default Buy;