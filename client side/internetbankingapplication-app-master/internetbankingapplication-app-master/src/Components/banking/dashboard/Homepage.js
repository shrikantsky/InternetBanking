import React, { useState } from "react";
import Header from './Header';
import Footer from "./Footer";
import back from './images/background.png';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function Homepage() {

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = () => {
        const payload = {
            userId: userId,
            password: password
        }
        axios.get("http://localhost:8080/user/signin/" +userId+"/"+password ).then(resp => {
            localStorage.setItem('loginuser', JSON.stringify(resp.data));
            navigate("/customer/dashboard");
        })
            .catch(error => {
                setMessage(error.response.data);
            });

    }


    return (
        <div className="container-fluid">
            <Header />

            <div className="row">

                <div className="col-sm" style={{backgroundImage:'url('+back+')' ,backgroundSize:'cover'}}>
                    

                    <div className="text-center col-12" style={{ color: '#fff', top:'70%' ,backgroundColor:'rgba(0,0,0,0.4)', border:'1px solid #fff' }}>
                        <h4>IBA is personal finance,  <br></br>made simple.</h4>
                        <p>All your accounts, cards, savings, <br></br>and investments in one place.</p>
                    </div>
                </div>

                <div className="col-sm">
                    <div className="container text-left form" style={{ padding: '20%', lineHeight: '2.5' }}>
                        <h2><b>Log in</b></h2>

                        {
                            message &&
                            <div className="alert alert-danger">{message}</div>
                        }

                        <div className="form-group">
                            <label forhtml="userId">User Id :</label>
                            <input type="text" className="form-control" name="userId" id="userId" placeholder="Enter your User Id"
                                onChange={(event) => setUserId(event.target.value)} value={userId} />
                        </div>

                        <div className="form-group">
                            <label forhtml="password">Password :</label>
                            <input type="password" className="form-control" name="password" id="password" placeholder="Enter your Password"
                                onChange={(event) => setPassword(event.target.value)} value={password} />
                        </div>

                        <button onClick={handleSubmit} className="btn btn-dark btn-block">Log in</button>

                        <Link to="/customer/add" >Sign Up</Link>

                     
                        
                        
                        
                    </div>
                </div>

            </div>

           <Footer/>
        </div>
    )
}

export default Homepage;