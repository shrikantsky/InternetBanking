import React from "react";

import { Link } from "react-router-dom";
import CustomerLogout from "../customer/CustomerLogout";
import ReportTransaction from "./ReportTransaction";

function Transaction() {

    const user = JSON.parse(localStorage.getItem('loginuser'));
    
    return (
        <div className="wrapper">

        <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark" style={{width: '200px', color: '#fff'}}>
            <div className="container">
                <h3>IBA</h3>
            </div>

            <hr/>

            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/customer/dashboard">
                        <p className="nav-link">Dashboard</p>
                    </Link>
                </li>
                <li>
                    <Link to={`/customer/accounts/${user.userId}`}>
                        <p className="nav-link">Accounts</p>
                    </Link>
                </li>
                <li>
                    <Link to="/customer/withdraw">
                        <p className="nav-link">Withdraw</p>
                    </Link>
                </li>
                <li>
                    <Link to="/customer/deposit">
                        <p className="nav-link">Deposit</p>
                    </Link>
                </li>
                <li>
                    <Link to="/customer/transfer">
                        <p className="nav-link">Transfer</p>
                    </Link>
                </li>
                <li>
                    <Link to="/customer/transactions">
                        <p className="nav-link active">Transaction</p>
                    </Link> 
                </li>

                <hr/>

                <li className="nav-item">
                    <Link to="/customer/settings">
                    <p className="nav-link">Settings</p>
                    </Link>
                </li>
                <li>
                    <p className="nav-link logout">
                        <CustomerLogout/>
                    </p>
                </li>

            </ul>
        </div>

        <div className="container">
            <div className="p-3">
                <h3>Transactions</h3>

                <p className="" style={{float: 'right'}}>Username</p><br/>
            </div>

         <ReportTransaction/>

            
        </div>

    </div>
    )
}

export default Transaction;