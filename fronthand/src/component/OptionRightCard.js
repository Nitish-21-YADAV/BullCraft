import React from 'react';

function OptionRightCard({icon,title,description}) {
    return (
        <div className='optionright'>
                {icon}
                <h1>{title}</h1>
                <p>{description}</p>
        </div>
    );
}

export default OptionRightCard;