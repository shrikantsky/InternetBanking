import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomerLogout from "../customer/CustomerLogout";

function Transfer() {

    const options = JSON.parse(localStorage.getItem('accounts'));
    const user = JSON.parse(localStorage.getItem('loginuser'));

    const [senderAccountId, setSenderAccountId] = useState('');
    const [receiverAccountId, setReceiverAccountId] = useState('');
    //const [password, setPassword] = useState('');
    const [amount, setAmount] = useState('');

    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        const payload = {
            accountId: senderAccountId,
            receiverAccountId: receiverAccountId,
            amount: amount
            //password : password
        }

        axios.post("http://localhost:8080/account/transfer", payload).then(resp =>
            alert("Rs." + resp.data.amount + " transfered")
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
                            <p className="nav-link">Deposit</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/customer/transfer">
                            <p className="nav-link active">Transfer</p>
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
                    <h3>Transfer</h3>

                    <p className="" style={{ float: 'right' }}>Username</p><br />
                </div>

                <div className="container bg-light p-5">
                    <div className="form-group">
                        <label forhtml="senderAccountId">Sender Account Id :</label>
                        <select className="form-control" name="senderAccountId" id="senderAccountId"

                            onChange={(event) => setSenderAccountId(event.target.value)} value={senderAccountId}>

                            <option>Please choose one option</option>

                            {options.map((option) => {

                                return <option >

                                    {option.accountId}

                                </option>



                            })}

                        </select>
                    </div>

                    <div className="form-group">
                        <label forhtml="receiverAccountId">Receiver Account Id :</label>
                        <input type="text" className="form-control" name="receiverAccountId" id="receiverAccountId" placeholder="Enter receiver's Account Id"
                            onChange={(event) => setReceiverAccountId(event.target.value)} value={receiverAccountId} />
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

                    <button className="btn btn-dark btn-block" onClick={handleSubmit}>Transfer</button>
                </div>
                {
                    message &&
                    <div className="alert alert-danger">{message}</div>
                }
            </div>

        </div>
    )
}

export default Transfer;