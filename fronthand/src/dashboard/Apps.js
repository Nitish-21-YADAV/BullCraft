import React, { useState } from "react";
import { handleError, handleSuccess } from "../Util";


const Apps = () => {
  const userId = localStorage.getItem('UserId');
  const [emailValue,setEmailValue]=useState(null);
  const [subjectValue,setSubjectValue]=useState(null);
  const [exampleVlaue,setExampleValue]=useState(null);

  const handleEmail = (event)=>{
    const emailDeatils=event.target.value
    setEmailValue(emailDeatils)
  }
  const handleSubject =(event)=>{
    const subjectDetails=event.target.value
    setSubjectValue(subjectDetails)
  }
  const handleExample = (event)=>{
    const exampleDeatils=event.target.value
    setExampleValue(exampleDeatils)
  }

  const handleFeedback =async(req,res)=>{

    const feedbackData={
      userId,
      email:emailValue,
      subjectEmail:subjectValue,
      feebackMessage:exampleVlaue
    }

  
    

    try{
    const resposne = await fetch(`${process.env.REACT_APP_Backhand_URL}/feedback`,
      {
        method:"POST",
        headers:{
           'Content-Type': 'application/json'
        },
        body:JSON.stringify(feedbackData)
      }
    )
    const result = await resposne.json()
    if(result.success){
      setEmailValue('');
      setSubjectValue('');
      setExampleValue('');
      handleSuccess(result.message)
    }
    else{
      handleError(result.message)
    }
  }
    catch(error){
      console.log("Error in Feedback: ",error);
    }

  }
  return (
    <div className='parent' style={{width: "90%", display: "flex", flexDirection: "column", gap: "20px", alignItems: "center", borderRadius: "10px", margin:"5% 5% 0 5%",backgroundColor: "rgba(24, 24, 24, 0.792)",color:"white"}}>
      <label style={{ marginTop: "5vh", textAlign: "center", fontSize: "1.4rem",marginBottom:"3%"}}>Share <span style={{color:"rgb(245, 104, 52)"}}>Your</span> Feedback</label>
      <div className='inner-parent' style={{ display: "flex", flexDirection: "row",gap:"10%",width:"100%",padding:"0 5%" }}>
        <div className="mb-3" style={{width:"50%"}}> 
          <label for="exampleFormControlInput1" className="form-label">Email address</label>
          <input type="email" value={emailValue} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" onChange={handleEmail} style={{backgroundColor:"transparent",border:"none",borderBottom:"2px solid white",color:"white"}}></input>
        </div>
        <div className="mb-3" style={{width:"50%"}}>
          <label for="Subject" className="form-label">Subject</label>
          <input type="text" value={subjectValue} className="form-control" id="exampleFormControlInput1" placeholder="Subject" onChange={handleSubject} style={{backgroundColor:"transparent",border:"none",borderBottom:"2px solid white",color:"white"}}></input>
        </div>
      </div>
      <div className="mb-3" style={{width:"100%",padding:"0% 5%"}}>
        <label for="exampleFormControlTextarea1" className="form-label">Example textarea</label>
        <textarea className="form-control" value={exampleVlaue} id="exampleFormControlTextarea1" rows="5" onChange={handleExample} style={{backgroundColor:"transparent",border:"none",borderBottom:"2px solid white",color:"white"}}></textarea>
      </div>
      <button className='btn px-4 py-2' onClick={handleFeedback} style={{ width: "max-content", fontSize: "20px", borderRadius: "10px", alignItems: "center", textAlign: "center", margin: "0%  40% 4% 40%" ,backgroundColor:"rgb(245, 104, 52)"}}>Send Feedback </button>
    </div>
  );
};

export default Apps;