import React from 'react';
import '../dashboard.css'
import Menu from './Menu'

function TopBar() {
    return ( 
    <div className='topbar-container'>
            <div className='indices-container'>
                <div className='nifty'>
                    <p className='infity'>INFITY 50</p>                  
                    <p className='index-point'>{100.2}</p>
                    <p className='percent'></p>
                </div>
                <div className='sensex'>
                    <p className='infity'>SENSEX</p>                  
                    <p className='index-point'>{100.2}</p>
                    <p className='percent'></p>
                </div>
            </div>
            <Menu/>
        </div>
    );
}

export default TopBar;