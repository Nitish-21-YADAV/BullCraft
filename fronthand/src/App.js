import logo from './logo.svg';
import './App.css';
import Home from './component/Home';
import Title from './component/Title';
import FeaturPage from './component/FeaturePage';
import AdvanceFeatures from './component/AdvanceFeatures';
import OptonFill from './component/OptionFill';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import Reviews from './component/Reviews';
import Fquestion from './component/Fquestion';
import Footer from './component/Footer';
import SignUp from './dashboard/SignUp';
import LoginUp from './dashboard/LoginUp';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import UserForm from './dashboard/userForm/UserForm';
import Orders from './dashboard/Orders'
import Holdings from './dashboard/Holdings'
import Positions from './dashboard/Positions'
import Summary from './dashboard/Summary'
import HomeIndex from './dashboard/HomeIndex';
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<MainLayout />} />
          <Route path='/dashboard/SignUp' element={<SignUp />} />
          <Route path='/dashboard/LoginUp' element={<LoginUp />} />
          <Route path='/dashboard/UserForm' element={<UserForm />} />
          <Route path='/dashboard/*' element={<HomeIndex />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


function MainLayout() {
  return (
    <>
      <Title />
      <div id="home">
        <Home />
      </div>
      <div id="features">
        <FeaturPage />
      </div> 
      <AdvanceFeatures />
      <OptonFill />
      <div id="reviews">
        <Reviews />
      </div>
      <Fquestion />
      <Footer />
    </>
  );
}


export { MainLayout };
export default App; 
