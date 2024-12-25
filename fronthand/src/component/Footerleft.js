import React from 'react';
import '../App.css'

function Footerleft() {
    return ( 
        <div className='footer-left'>
            <span >
                <img className='logo ' src='/logo.webp'style={{height:"3rem",width:"4rem"}} alt='BullCraft Logo'></img>    
                <h1 style={{fontWeight:"700"}}>BullCraft</h1>
            </span>
            <p>Vaishnavi Tech Park, 3rd & 4th Floor Ganesh Main Road, Titwala Maharashtra</p>
            <a>Contact us</a>
        </div>
    );
}

export default Footerleft;