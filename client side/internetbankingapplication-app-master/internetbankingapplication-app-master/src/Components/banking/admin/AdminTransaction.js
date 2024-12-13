import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLogout from "./AdminLogout";
import admin from './images/admin.jpg';


function AdminTransaction() {

    return (


        
            <div class='wrapper'   style={{backgroundImage: 'url(' + admin + ')', backgroundSize: 'cover' }}>
            <div className="d-flex flex-column p-3 flex-shrink-0 bg-dark" style={{ width: '200px', color: '#fff',height:'100vh' }}>
                <div className="container">
                    <h3>IBA</h3>
                    <p>Admin</p>
                </div>

                <hr />

                <ul className="nav nav-pills flex-column mb-auto">
                  
                    <li>
                        <Link to="/admin/customer/">
                            <p className="nav-link ">Customer</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/transaction">
                            <p className="nav-link active">Transaction</p>
                        </Link>
                    </li>

                    <hr />

                    
                    <li>
                        <p className="nav-link logout">
                            <AdminLogout/>
                        
                        </p>
                    </li>

                </ul>

            </div>


            <div className='container' id="bgborder">
            <h1>Admin Panel</h1>
            <br></br>
            <h2>Transaction <i class="material-icons">filter_alt</i></h2>
            <hr />
            <br />
            <div>
            <h5>Transaction By Transactio-Id </h5>
                <Link to={`/admin/transaction/details`}>Transaction By Transactio-Id</Link >
                <hr />
            </div>


         
            <div>
                <h5>Transaction By Account-Id</h5>
                <Link to={`/admin/transaction/account`}>Transaction By Transactio-Id</Link >
                </div>
            <hr />
            <div>
                <h5>Transaction Based On Date Of Transaction</h5>
                <Link to={`/admin/transaction/acccount/date`}>Transaction By Transactio-Id</Link >
                </div>
        
                <Link to="/admin/dashboard" className="btn btn-danger">Back</Link>






        </div >
            </div>
        

     
    )




}
export default AdminTransaction;