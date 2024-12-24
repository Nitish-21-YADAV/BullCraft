import React from 'react';
import '../dashboard.css'
import TopBar from './TopBar'
import DashBoard from './Dashboard'
import Summary from './Summary';
import WatchList from './WatchList';

function HomeIndex() {
    return ( 
        <>
            <TopBar/>
            <DashBoard/>
        </>
    );
}

export default HomeIndex;