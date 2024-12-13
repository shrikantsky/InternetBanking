import axios from "axios";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import CustomerLogout from "../customer/CustomerLogout";

function Deposit() {

    const user = JSON.parse(localStorage.getItem('loginuser'));
    const options = JSON.parse(localStorage.getItem('accounts'));

    const [accountId, setAccountId] = useState('');
    //const [password, setPassword] = useState('');
    const [amount, setAmount] = useState('');

    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        const payload = {
            accountId: accountId,
            amount: amount
            //password : password
        }

        axios.post("http://localhost:8080/account/deposit", payload).then(resp =>
            alert("Rs." + resp.data.amount + " deposited")
        )
            .catch(error => {
                setMessage(error.response.data);
            });
    }

    return (
        <div className="wrapper">

            <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark" style={{ width: '200px', color: '#fff' }}>
                <div className="container">
                    <h3>IBA</h3>
                </div>

                <hr />

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
                            <p className="nav-link active">Deposit</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/customer/transfer">
                            <p className="nav-link">Transfer</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/customer/transactions">
                            <p className="nav-link">Transaction</p>
                        </Link>
                    </li>

                    <hr />

                    <li className="nav-item">
                        <Link to="/customer/settings">
                            <p className="nav-link">Settings</p>
                        </Link>
                    </li>
                    <li>
                        <p className="nav-link logout">
                            <CustomerLogout />
                        </p>
                    </li>

                </ul>

            </div>

            <div className="container">
                <div className="p-3">
                    <h3>Deposit</h3>

                    <p className="" style={{ float: 'right' }}>Username</p><br />
                </div>


                <div className="container bg-light p-5">
                    <div className="form-group">
                        <label forhtml="accountId">Account Id :</label>
                        <select className="form-control" name="accountId" id="accountId" onChange={(event) => setAccountId(event.target.value)} value={accountId}>

                            <option>Please choose one option</option>

                            {options.map((option) => {

                                return <option >

                                    {option.accountId}

                                </option>

                            })}

                        </select>
                    </div>

                    <div className="form-group">
                        <label forhtml="amount">Amount :</label>
                        <input type="number" className="form-control" name="amount" id="amount" placeholder="Enter your Amount"
                            onChange={(event) => setAmount(event.target.value)} value={amount} />
                    </div>

                    {/* <div className="form-group">
                        <label forhtml="password">Password :</label>
                        <input type="password" className="form-control" name="password" id="password" placeholder="Enter your Password" /> 
                    </div> */}

                    <button className="btn btn-dark btn-block" onClick={handleSubmit}>Deposit</button>
                </div>

                {
                    message &&
                    <div className="alert alert-danger">{message}</div>
                }
            </div>

        </div>
    )
}

export default Deposit;