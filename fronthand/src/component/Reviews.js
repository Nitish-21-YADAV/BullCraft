import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Reviews() {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 3,
        autoplaySpeed: 4000,
        autoplay:true,
        responsive: [
            {
              breakpoint: 750, 
              settings: {
                autoplay:true,
                slidesToShow: 2,
                slidesToScroll: 1,
                autoplaySpeed: 4000,
                infinite: true,
              },
            },
            {
              breakpoint: 450,
              settings: {
                autoplay:true,
                slidesToShow: 1,
                autoplaySpeed: 4000,
                infinite: true,
              },
            },
          ],
      };


    return (

        <div className="card w3/4 m-auto mt-5" id='outerreview' style={{ display:"flex",border:"none" }}>
            <h1 style={{marginBottom:"5rem"}}>" What <span className='review-orng'>India </span>feels <br/><span> about <span className='review-orng'>BullCraft </span></span>"</h1>
            <div style={{padding:'20px 20px'}}>
            <Slider {...settings}>
            {reviewData.map((d, index) => (
                <div className='reviewcard'>
                    <React.Fragment key={index}>
                        <div className='reviewcard1'>
                        <img src={d.image} className="card-img-top h-44 w-30 rounded-full" alt="..." />
                        <h5 className="card-title">{d.title}</h5>
                        </div>
                        <div className="card-body" >
                            <p className="card-text">{d.description}</p>
                        </div>

                    </React.Fragment>
                </div>
            ))}
            </Slider>
            </div>
        </div>

    );
}

const reviewData = [
    {
        image: '/RV1.webp',
        title: "Arnav Singh",
        description: "BullCraft has given me the confidence to invest in the stock market. I’ve been able to grow my savings significantly over time. With the right strategies and mindset, the stock market offers endless opportunities. I highly recommend it for anyone serious about long-term wealth building."
    },
    {
        image: '/RV2.webp',
        title: "Rohan Yadav",
        description: "Investing in the stock market was intimidating at first, but BullCraft's insights and tools made it so much easier. With steady, informed investments, I’ve seen great returns over the last few years. The key is to stay patient and not react impulsively to short-term changes!"
    },
    {
        image: '/RV3.jpg',
        title: "Abhi Pandey",
        description: "I’ve been using BullCraft for my stock market journey, and I’ve seen consistent growth in my investments. It’s the perfect platform for both new and experienced investors. With the right strategy, the share market has been a great way to secure my financial future."
    },
    {
        image: '/RV4.jpeg',
        title: "Jash Devkar",
        description: "Thanks to BullCraft, I’ve developed a clear understanding of how to navigate the stock market. By following a disciplined approach and focusing on long-term growth, I’ve managed to see strong returns. It’s been a game-changer in building my wealth!"
    },
    {
        image: '/RV5.jpeg',
        title: "Ronak Sonkusare",
        description: "The stock market can be overwhelming, but BullCraft has made it a smooth journey for me. I started small, and over time, I’ve seen steady profits. It’s a great tool for anyone looking to invest confidently and build a secure financial future."
    },
]

export default Reviews;