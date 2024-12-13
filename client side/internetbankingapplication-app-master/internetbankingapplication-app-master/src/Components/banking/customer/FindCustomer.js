import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AdminLogout from "../admin/AdminLogout";
import axios from 'axios'

function FindCustomer() {

    const [customer, setCustomer] = useState(null);

    const { id } = useParams();

    const bal = JSON.parse(localStorage.getItem('minBal'));
    
    useEffect(() => {
        axios.get("http://localhost:8080/customer/find/" + id).then(resp => setCustomer(resp.data))
    }, [id]);


    return (
        <div className="wrapper">
            <div className="d-flex flex-column p-3 flex-shrink-0 bg-dark" style={{ width: '200px', color: '#fff' , height:'100vh' }}>
                <div className="container">
                    <h3>IBA</h3>
                    <p>Admin</p>
                </div>

                <hr />

                <ul className="nav nav-pills flex-column mb-auto">
                    <li>
                        <Link to="/admin/customer/all">
                            <p className="nav-link active ">Customer</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/transaction">
                            <p className="nav-link ">Transaction</p>
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

            <div class="container">
                <div className="p-3">
                    <h3>Customer Details</h3>
                </div>

                <div className="container">
                    {
                        customer !== null &&

                        <table className="table bg-light">
                            <tr>
                                <td>User Id :</td>
                                <td><b>{customer.userId}</b></td>
                            </tr>
                            <tr>
                                <td>Customer Name :</td>
                                <td><b>{customer.customerName}</b></td>
                            </tr>
                            <tr>
                                <td>Email Id :</td>
                                <td><b>{customer.emailId}</b></td>
                            </tr>
                            <tr>
                                <td>Gender :</td>
                                <td><b>{customer.gender}</b></td>
                            </tr>
                            <tr>
                                <td>Age :</td>
                                <td><b>{customer.age}</b></td>
                            </tr>
                            <tr>
                                <td>Phone No :</td>
                                <td><b>{customer.phoneNo}</b></td>
                            </tr>
                        </table>
                    }

                    <div>
                        <Link to={`/admin/customer/all/${bal}`} className="btn btn-danger">Back</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default FindCustomer;

