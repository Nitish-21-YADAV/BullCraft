    import React from 'react';
    import '../App.css'
    import { useState } from 'react';

    function Fquestion() {
        
        const [openIndex, setOpenIndex] = useState(null);

        const handleChange = (index) => {
            setOpenIndex(openIndex === index ? null : index);
        };
        return (
            <div className='top_fquestion'>
                <h1><span className='frequently'>Frequently Asked</span> Question</h1>
                <p>Questions on your mind? Dont worry we have the answers!</p>
                {faqs.map((answers,index) => (
                    <div className='mid_fquestion' key={index}>
                        <div className='mid_fquestion-1'>
                            <h3 >{answers.question}</h3>
                            <span onClick={()=>{handleChange(index)}}>
                            {openIndex === index ? '-' : '+'}
                            </span>
                        </div>
                        <div className={`mid_fquestion-2 ${openIndex === index ? 'mid_fquestion-2open' : ''}`}>
                            <p>{answers.answer}</p>
                        </div>
                    </div>

                ))}

            </div>
        );
    }

    export default Fquestion;


    const faqs = [
        {
        question: "What is stock trading?",
        answer: "Stock trading involves buying and selling shares of companies in the stock market. \
    Traders buy low and sell high to earn a profit. Stock prices fluctuate based on market conditions, \
    company performance, and other factors. Successful trading involves proper timing and analysis."
        },
        {
        question: "How do I start trading on BullCraft?",
        answer: "To start, create an account on BullCraft, verify your details, and deposit funds. \
    Once registered, explore available stocks and use our intuitive interface to place buy or sell orders. \
    You can manage your investments directly from the dashboard, tracking your portfolio easily."
        },
        {
        question: "What are the risks involved in trading?",
        answer: "Trading carries market risk, which means the stock prices may fall and result in losses. \
    Price volatility, company performance, and market conditions can affect your investment. To mitigate risk, \
    traders should research thoroughly and avoid emotional decisions when buying or selling stocks."
        },
        {
        question: "Can I trade from my mobile device?",
        answer: "Yes, BullCraft is mobile-friendly, allowing you to trade anytime, anywhere. \
    You can access the platform from your phone or tablet, view real-time data, and execute trades on the go. \
    Our responsive design ensures a seamless experience across all devices."
        },
        {
        question: "What tools does BullCraft offer for analysis?",
        answer: "BullCraft provides real-time data feeds, detailed stock charts, and technical indicators. \
    You can access market news and financial reports to stay informed. We also offer various analytics tools to \
    help you assess trends and make smarter trading decisions based on data."
        }
    ];
    
