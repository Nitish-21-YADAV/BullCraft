import React from 'react';
import '../App.css'
import AdvanceFeaturesData from './AdvanceFeaturesData';
import LastMessage from './LastMessage';

function AdvanceFeatures() {

    const handleSignUpClick= async (e)=>{
        window.open('./dashboard/SignUp','_blank')
    }

    return (
    <div className='advcomps'>
        <h1>BullCraft <span className='adv-feature'>Features</span></h1>
        <p>Premium Trading Tools.</p>
        <AdvanceFeaturesData/>
        <button onClick={handleSignUpClick}>Open Demat Account</button>
        
    </div>
    );
}

export default AdvanceFeatures;