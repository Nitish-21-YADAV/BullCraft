import React from 'react';
import OptionRightCard from './OptionRightCard';
function OptionRightData() {
    const optionData=[
        {
            icon:<i class="fa-solid fa-1 fa-4x"></i>,
            title:<h1>Click</h1>,
            description:<p>Click on Open free Demat Account</p>
        },
        {
            icon:<i class="fa-solid fa-2 fa-4x"></i>,
            title:<h1>Fill</h1>,
            description:<p>Fill your details and uplaod the documents</p>
        },
        {
            icon:<i class="fa-solid fa-3 fa-4x"></i>,
            title:<h1>Complete</h1>,
            description:<p>Complete e-KYC process for quick Verification</p>
        }
    ]
    
    return (
    <div className='option_data_card'>
        {optionData.map((details,index)=>(
        <OptionRightCard
                key={index}
                icon={details.icon}
                title={details.title}
                description={details.description}
        />
            ))}
    </div>
    );
}

export default OptionRightData;