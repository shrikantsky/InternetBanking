import React from 'react';
import Footer from './Footer';
import Header from './Header';
import About from './images/About.png';
function AboutUs() {
    return (<div >

        <Header/>

        <img src={About} width='100%' height={'auto'} />

        <Footer/>

    </div>)
}

export default AboutUs;