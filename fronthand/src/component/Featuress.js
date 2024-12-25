import React from 'react';
import '../App.css'
import FeatureData from './FeatureData';

function Featuress({ pricing, title, description }) {
    return (
        <div className='featurecomps'>
            
                <h3>{pricing}</h3>
                <h4>{title}</h4>
                <p>{description}</p>
            
        </div>);
}

export default Featuress;