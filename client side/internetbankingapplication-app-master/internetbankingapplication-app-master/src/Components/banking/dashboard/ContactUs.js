import React from 'react';
import Footer from './Footer';
import Header from './Header';
import contact from './images/contact.png';

function ContactUs(){

    
    return(<div >

        <Header/>
        <img  src={contact} width='100%' height={'auto'}/>
        <Footer/>
    </div>)
}

export default ContactUs;