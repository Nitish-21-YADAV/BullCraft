import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const handleSuccess = (msg)=>{
    toast.success(msg,{
        position:"top-right"
    })
}

export const handleError = (msg)=>{
    toast.error(msg,{
        position:"top-right"
    })
}

function UserForm() {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        fname: '',
        contact: '',
        email: '',
        country: '',
        lname: '',
        altcontact: '',
        altemail: '',
        state: '',
        address: '',
        work: ''
       
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();        
        const {fname,contact,email,country,address,work}=formData;
        if(!fname||!contact||!email||!country||!address||!work)
        {
            return handleError('Name Contact Email And Pasword are Required');
        }
        
        try {
          const response = await fetch(`${process.env.REACT_APP_Backhand_URL}/submit`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const result = await response.json(); 
          console.log(result);

          const {success,message,error}=result;
          if(success){
              handleSuccess(message);
              setTimeout(()=>{
                  navigate('/dashboard/LoginUp')
              },3000)
          }
          else if(error){
              let detail =error?.details[0].message;
              handleError(detail);
          }
          else if(!success)
          {
              handleError(message);
          }


        } catch (error) {
            handleError(error.message)
          console.error('Just Login');
        }
      };
      

    return (
        <>
        <ToastContainer />
            <form method='POST' onSubmit={handleSubmit}>
                <div className='userForm-Hero' style={{ backgroundColor: "white", margin: "30px", borderRadius: "20px" }}>
                    <h1 style={{ textAlign: 'center' }}>
                        <span style={{ color: "orange" }}>User</span> Form
                    </h1>

                    <div className='userForm'>
                        <div className='left-comp'>
                            <input placeholder='First Name' name='fname' value={formData.fname} onChange={handleChange} required type='text' />
                            <input placeholder='Contact Number' name='contact' value={formData.contact} onChange={handleChange} required />
                            <input placeholder='abc@xyz.com' name='email' value={formData.email} onChange={handleChange} required type='email' />
                            <input placeholder='Country' name='country' value={formData.country} onChange={handleChange} required type='text'/>
                        </div>
                        <div className='right-comp'>
                            <input placeholder='Last Name' name='lname' value={formData.lname} onChange={handleChange} required/>
                            <input placeholder='Alternative Number' name='altcontact' value={formData.altcontact} onChange={handleChange} required />
                            <input placeholder='Alternate Email' name='altemail' value={formData.altemail} onChange={handleChange} required type='email' />
                            <input placeholder='State' name='state' value={formData.state} onChange={handleChange} required />
                        </div>
                    </div>

                    <input
                        placeholder='Address'
                        className='address'
                        style={{ width: "88%", height: '2.7rem', marginLeft: "4.5%", border: "none", borderBottom: "1px solid black" }}
                        name='address'
                        value={formData.address}
                        onChange={handleChange}
                    />

                    <div className='userForm'>
                        <div className='left-comp'>
                            <input placeholder='Work' name='work' value={formData.work} onChange={handleChange} />
                        </div>
                        <div className='right-comp'>
                        </div>
                    </div>

                    <button className='submitButton' style={{ backgroundColor: '#f57c00', padding: '7px 30px', borderRadius: "10px", margin: '1rem auto', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        Submit
                    </button>
                </div>
            </form>
            
        </>
    );
}

export default UserForm;
