import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom';
import '../Home.css';

function Home() {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        window.open('./dashboard/SignUp', '_blank');
    };

    return (
        <div className="homeContainer">
            <div className="heroSection">
                <div className="overlay">
                    <div className="heroContent">
                        <h1 className="headline mt-5" style={{ textAlign: "center", alignItems: "center" }}>
                            Transform <span className="highlight">Your Trading</span> Experience
                        </h1>
                        <p className="heroSubText">
                            With BullCraft, you{' '}
                            <span style={{ color: 'orangered' }}>
                                <Typewriter
                                    words={['Invest Smartly', 'Earn Effortlessly', 'Grow Securely']}
                                    loop={true}
                                    cursor
                                    cursorStyle="_"
                                    typeSpeed={100}
                                    deleteSpeed={60}
                                    delaySpeed={1000}
                                />
                            </span>
                        </p>
                        <input className='iField p-2' style={{ width: '35%', marginTop: '2em', borderRadius: '20px' }} placeholder='Contact Number'></input>
                        <p className="heroText mt-4 px-5">
                            BullCraft is your ultimate destination for mastering the art of trading. Whether you are a beginner or a seasoned trader, our platform provides a wealth of resources, tools, and real-time market insights to help you make informed decisions.

                        </p>

                        <button className="ctaButton mt-5" onClick={handleSignUpClick}>
                            Sign Up Now
                        </button>
                    </div>
                </div>
            </div>

           
            <div className="features">
                <h2 className="features-heading">Why BullCraft?</h2>
                <div className="featureCards">
                    <div className="featureCard">
                        <h3>Real-Time Data</h3>
                        <p>Stay ahead with live market updates and real-time price tracking.</p>
                    </div>
                    <div className="featureCard">
                        <h3>Advanced Security</h3>
                        <p>Trade with confidence using our top-tier security protocols.</p>
                    </div>
                    <div className="featureCard">
                        <h3>Expert Insights</h3>
                        <p>Access expert advice and insights tailored to your trading style.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

