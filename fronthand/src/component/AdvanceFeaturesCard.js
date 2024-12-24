import React from 'react';
import '../App.css'
import AdvanceFeaturesData from './AdvanceFeaturesData';

function AdvanceFeaturesCard({icon,description}) {
    return(
        <div className='advdatacard'>
            {icon}
            <p>{description}</p>
        </div>
    );
}

export default AdvanceFeaturesCard;