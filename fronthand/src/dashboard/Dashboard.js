import React, { useEffect, useState } from 'react';
import { BrowserRouter,Router,Route, Routes } from 'react-router-dom'
import Orders from './Orders'
import Holdings from './Holdings'
import Positions from './Positions'
import Funds from './Funds'
import Summary from './Summary'
import WatchList from './WatchList'
import '../dashboard.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import TopBar from './TopBar';
import Apps from './Apps';
import Buy from './Buy';
import Sell from './Sell';


function Dashboard() {
    const [userName, setUserName] = useState('')
    useEffect(() => {
        const storageName = localStorage.getItem('loggedInUser')
        if (storageName) {
            setUserName(storageName)
        }
    }, []);

    return (
        <div className='dashboard-container '>
            <ToastContainer/>
            <div className='content-1'>
                <WatchList />
            </div>
            <div className='content-2'>
       
                    <Routes>
                        <Route exact path='/*' element={<Summary />}></Route>
                        <Route path='Orders' element={<Orders />}></Route>
                        <Route path='Holdings' element={<Holdings />}></Route>
                        <Route path='Positions' element={<Positions />}></Route>
                        <Route path='Funds' element={<Funds />}></Route>
                        <Route path='Apps' element={<Apps />}></Route>
                        <Route path='Buy' element={<Buy />}></Route>
                        <Route path='Sell' element={<Sell/>}></Route>
                        <Route path='Order' element={<Orders/>}></Route>
                    </Routes>
             
            </div>

        </div>
    );
}

export default Dashboard;