import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";
import AdminLogout from "./AdminLogout";

function CustomerWithMinBalance() {

    const [customer, setCustomer] = useState([]);

    const { bal } = useParams();

    useEffect(() => {
        axios.get("http://localhost:8080/customer/all/" + bal).then(resp => {
            setCustomer(resp.data);
            localStorage.setItem('user',JSON.stringify(resp.data));
        })
    }, [bal]);

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
                        <Link to="/admin/customer">
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


            <div class="conatiner">
                <div className="p-3">
                    <h3>Admin Panel</h3>
                </div>

                <div className="container">
                    <table class="table table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>User Id</th>
                                <th>Customer Name </th>
                                <th>Phone No</th>
                                <th>Email Id </th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>View</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                customer.map(c => <tr key={c.userId}>

                                    <td>{c.userId}</td>
                                    <td> {c.customerName}</td>
                                    <td>{c.phoneNo}</td>
                                    <td>{c.emailId}</td>
                                    <td>{c.age}</td>
                                    <td>{c.gender}</td>
                                    <td><Link to={`/admin/customer/find/${c.userId}`} className="btn btn-info">View</Link></td>
                                    <td> <Link to={`/admin/customer/update/${c.userId}`} className="btn btn-warning">Update</Link></td>
                                    <td> <Link to={`/admin/customer/delete/${c.userId}`} className="btn btn-danger">Delete</Link></td>
                                </tr>)
                            }
                        </tbody>

                    </table>

                    <Link to="/admin/customer" className="btn btn-danger">Back</Link>
                </div>

            </div>
        </div>
    )
}

export default CustomerWithMinBalance;
