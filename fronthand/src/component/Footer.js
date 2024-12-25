import React from 'react';
import '../App.css'
import Footerleft from './Footerleft';
import Footerright from './Footerright'
function Footer() {
    return (
        <div className='ftter'>
            <div className='footer'>
                <Footerleft />
                <Footerright />

            </div>
            <p className='ft-last'>©This is Only for Educational Purpose</p>
        </div>);
}

export default Footer;