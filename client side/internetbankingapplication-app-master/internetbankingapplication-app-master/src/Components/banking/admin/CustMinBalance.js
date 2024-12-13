import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import AdminLogout from "./AdminLogout";

function CustMinBalance() {

    const [balance, setBalance] = useState('');

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate(`/admin/customer/all/${balance}`);
        localStorage.setItem("minBal", balance);
    }

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
                            <AdminLogout />
                        </p>
                    </li>
                </ul>
            </div>

            <div className="container">
                <div className="p-3">
                    <h3>Find Customer</h3>
                </div>

                <div className="container">
                    <div className="form-group">
                        <label htmlFor="balance">Balance :</label>
                        <input type="number" className="form-control" id="balance" name="balance"
                            onChange={(event) => setBalance(event.target.value)} value={balance} placeholder="Enter Minimum Balance" />
                    </div>

                    <div>
                        <button className="btn btn-primary" onClick={handleSubmit}>Find</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustMinBalance;