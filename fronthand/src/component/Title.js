import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import { useState,useEffect } from 'react';
import gsap from 'gsap'
import { Link } from 'react-router-dom';
import FeaturPage from './FeaturePage';

function Title() {
    const [isopen,setIsopen]=useState(false);
    const initialPath = `M 20 100 Q 500 100 990 100`;
    const finalPath = `M 10 100 Q 500 100 990 100`;

   
    useEffect(() => {
        const part1Element = document.querySelector('.part1');

        const handleMouseMove = (event) => {
            const dynamicPath = `M 20 100 Q ${event.clientX} ${event.clientY} 990 100`;
            gsap.to('.part1 svg path', {
                attr: { d: dynamicPath },
                duration: 0.3,
                ease: 'power3.out',
                
            });
        };

        const handleMouseLeave = () => {
            gsap.to('.part1 svg path', {
                attr: { d: finalPath },
                duration: 1.3,
                ease: 'elastic.out(1, 0.2)',
            });
        };

        if (part1Element) {
            part1Element.addEventListener('mousemove', handleMouseMove);
            part1Element.addEventListener('mouseleave', handleMouseLeave);
        }

               return () => {
            if (part1Element) {
                part1Element.removeEventListener('mousemove', handleMouseMove);
                part1Element.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [finalPath]);


    function handleChange() {
        console.log("click");
        setIsopen(!isopen);
    }

    const [text] = useTypewriter({
        words: ['BullCraft'],
        loop: true,
    })

    return (
        <div className='navh'>
            <div className='navv'>
                <h1>{text}<Cursor /></h1>
                <span> {isopen ? (<i class="fa-regular fa-circle-xmark" onClick={handleChange}></i>) : (<i class="fa-solid fa-bars" onClick={handleChange}></i>)}</span>
                
            </div>
            
            {isopen &&
                <ul
                    className={`dropdown ${isopen ? 'openc' : ''}`}
                    onClick={() => setIsopen(!isopen)}
                >
                    <li><a href="#home">Home</a></li>
                    <li><a href='#features'>Features</a ></li>
                    <li><a href='#reviews'>Reviews</a></li>
                </ul>
            }

        </div>);

}

export default Title;