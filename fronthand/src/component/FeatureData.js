import React from 'react';
import '../App.css'
import Featuress from './Featuress';
function FeatureData() {

    const cardData=[
        {
            pricing:"₹0",
            title:"Account Opening Fees",
            description:"Open your Demat/Trading account for free"
        },
        {
            pricing:"₹0",
            title:"Brokerage Fees",
            description:"Zero Brokerage on Equity Delivery and Mutual Funds"
        },
        {
            pricing:"9.99%",
            title:"Interest p.a.",
            description:"Margin Trading Facility (MTF)"
        },
        {
            pricing:"₹20",
            title:"Brokerage ",
            description:"F&O, stocks & commodities"
        }
        
]
    return (
    <div className='feature-data'>
        {cardData.map((deatil,index)=>(
            <Featuress
            key={index}
            pricing={deatil.pricing}
            title={deatil.title}
            description={deatil.description}
            />
        ))}
    </div>
    );
}

export default FeatureData;