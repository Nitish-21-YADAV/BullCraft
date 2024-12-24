import React from 'react';
import '../App.css'
import Featuress from './Featuress';
import FeatureData from './FeatureData';
import LastMessage from './LastMessage';

function FeaturPage() {
    return (
        <div className='feature'>
            <h1>Our <span className='feature-pricing'>Pricing</span></h1>
            <p>Transparent rates.No hidden charges*</p>
            <FeatureData/>
            
        </div>
    );
}

export default FeaturPage;