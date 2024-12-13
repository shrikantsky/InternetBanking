import React, { useState } from 'react';
import logo from './images/logo.png';
import { useNavigate ,Link} from 'react-router-dom';



function Header() {

   

    return (
        <div className='conatiner-fluid'>
            <nav class="navbar navbar-expand-sm navbar-light bg-light">
                <p class="navbar-brand" >
                    <img src={logo} style={{ width: '50px' }} alt="no" />
                </p>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarsExample03">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <Link to='/'>
                            <p class="nav-link" >Home <span class="sr-only">(current)</span></p>
                            </Link>
                            
                        </li>
                        <li class="nav-item">
                            <Link to='/about'>
                            <p class="nav-link" >About Us</p>
                            </Link>
                           
                        </li>
                        <li class="nav-item">
                            <Link to='/contact'> 
                            <p class="nav-link" >Contact</p>
                            </Link>
                        </li>

                        
                    </ul>

                    
                      <Link to="/admin/login/">Admin Login</Link>
                      
                  

                </div>
            </nav>

           


        </div>
    )
}

export default Header;