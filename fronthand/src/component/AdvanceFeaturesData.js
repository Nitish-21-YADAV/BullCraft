import React from 'react';
import AdvanceFeaturesCard from './AdvanceFeaturesCard';
import '../App.css'
function AdvanceFeaturesData() {

    const advData=[
        {
            icon: <i class="fa-solid fa-user fa-2x"></i>,
            description:"Free Account Opening"
        },
        {
            icon: <i class="fa-solid fa-globe fa-2x"></i>,
            description:"Multi Level Security"
        },
        {
            icon: <i class="fa-solid fa-user fa-2x"></i>,
            description:"Free Account Opening"
        },
        {
            icon: <i class="fa-solid fa-user fa-2x"></i>,
            description:"Easy IPO Application"
        },
        {
            icon: <i class="fa-solid fa-laptop-file fa-2x"></i>,
            description:"Active Device Management"
        },
        {
            icon: <i class="fa-solid fa-user fa-2x"></i>,
            description:"Free Strategy Store"
        },
       
    ]
    return ( 
    <div className='advfeaturecard'>
        {advData.map((deatil,index)=>(
            <AdvanceFeaturesCard 
                key={index}
                icon={deatil.icon}
                description={deatil.description}
            />
        ))}
    </div>
    );
}

export default AdvanceFeaturesData;