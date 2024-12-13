
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate,Link } from 'react-router-dom';





function AdminLogin(){



    
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = () => {
        const payload = {
            userId: userId,
            password: password
        }
        axios.get("http://localhost:8080/admin/signin/" +userId+"/"+password ).then(resp => {
            localStorage.setItem('loginuser', JSON.stringify(resp.data));
            navigate("/admin/customer");
        })
            .catch(error => {
                setMessage(error.response.data);
            });

    }




    return(<div>
         {/* Modal  */}
         <div>
                <div class="modal-dialog" role="document">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Admin Login</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        {
                            message &&
                            <div className="alert alert-danger">{message}</div>
                        }

                        <div class="modal-body">
                            <div class="container text-left form" style={{ padding: '10%', lineHeight: '2.5' }}>
                                
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

                                    <button onClick={handleSubmit} class="btn btn-dark btn-block" >Log in</button>
                                   

                                    <p>Forgot your password ?</p>
                                    <Link to="/" className="btn btn-danger">Back to Home</Link>
                             
                            </div>
                        </div>

                        {/* <div class="modal-footer">
                            <button type="button" class="btn btn-primary">Log in</button>
                        </div> */}

                    </div>
                </div>
            </div>
    </div>)
}

export default AdminLogin;
