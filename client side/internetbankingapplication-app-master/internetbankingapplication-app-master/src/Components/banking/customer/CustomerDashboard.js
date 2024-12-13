import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Cback from '../dashboard/images/back.png';

import axios from "axios";
import CustomerLogout from "./CustomerLogout";

function CustomerDashboard() {

    const user = JSON.parse(localStorage.getItem('loginuser'));
    const [accounts, setAccounts] = useState([]);

    const [insterestRate, setInterestRate] = useState('6');
    const [balance, setBalance] = useState('');
    const [date, setDateOfOpening] = useState('');
    const custId = user.userId;

    const [minBalance, setMinBalance] = useState('1000');
    const [fine, setFine] = useState('500');

    const [amount, setAmount] = useState('');
    const [months, setMonths] = useState('');
    const [penalty, setPenalty] = useState('500');

    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const savings = () => {
        document.getElementById("savings").style.display = 'block';
        document.getElementById("term").style.display = 'none';
    }
    const term = () => {
        document.getElementById("savings").style.display = 'none';
        document.getElementById("term").style.display = 'block';
    }

    useEffect(() => { axios.get("http://localhost:8080/account/all/" + user.userId)
    .then(resp => {
        setAccounts(resp.data);
        localStorage.setItem('accounts', JSON.stringify(resp.data));
    }) }, [user.userId]
    )



    const handleSubmit = () => {
        const payload = {
            interestRate: insterestRate,
            balance: balance,
            dateOfOpening: "2022-10-15",
            customer: {
                userId: custId
            },
            minBalance: minBalance,
            fine: fine
        }
        axios.post("http://localhost:8080/account/savingsaccount/add", payload).then(resp => {
            alert("Account created with id : " + resp.data.accountId);
            navigate(`/customer/accounts/${user.userId}`);

        }).catch(error => {
            setMessage(error.response.data);
        });
    }


    const handleSubmitTerm = () => {
        const payload = {
            interestRate: insterestRate,
            balance: balance,
            dateOfOpening: "2022-10-15",
            customer: {
                userId: custId
            },
            amount: amount,
            months: months,
            penaltyAmount: penalty
        }
        axios.post("http://localhost:8080/account/termaccount/add", payload).then(resp => {
            alert("Term Account created with id : " + resp.data.accountId);
            navigate(`/customer/accounts/${user.userId}`);

        }).catch(error => {
            setMessage(error.response.data);
        });
    }


    return (
        <div className="wrapper text-left" style={{ backgroundImage: 'url(' + Cback + ')', backgroundSize: 'cover' }}>

            <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark" style={{ width: '200px', color: '#fff' }}>
                <div className="container">
                    <h3>IBA</h3>
                </div>

                <hr />

                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item" style={{ textDecoration: 'none' }}>
                        <Link to="/customer/dashboard">
                            <p className="nav-link active" aria-current="page">Dashboard</p>
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
                    <h3>Customer Dashboard</h3>
                    <p>Welcome {user.userId}</p>
                </div>

                <div className="container row text-light">
                    <div className="col-md m-3">
                        <button className="btn btn-dark btn-block" onClick={savings}>Add Savings Account</button>
                    </div>

                    <div className="col-md m-3">
                        <button className="btn btn-secondary btn-block" onClick={term}>Add Term Account</button>
                    </div>
                </div>

                <div className="container" id="savings">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Create Savings Account</h5>
                            </div>

                            <div className="modal-body">
                                {
                                    message &&
                                    <div className="alert alert-danger">{message}</div>
                                }

                                <div className="container text-left" style={{ lineHeight: '2.5' }}>
                                    <div className="form-group">
                                        <label forhtml="interestRate">Interest Rate :</label>
                                        <input type="number" className="form-control" name="interestRate" id="interestRate"
                                            onChange={(event) => setInterestRate(event.target.value)} value={insterestRate} disabled />
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-md">
                                            <label forhtml="balance">Amount :</label>
                                            <input type="number" className="form-control" name="balance" id="balance"
                                                onChange={(event) => setBalance(event.target.value)} placeholder="Enter your Amount" value={balance} />
                                        </div>

                                        <div className="form-group col-md">
                                            <label forhtml="dateOfOpening">Date :</label>
                                            <input type="date" className="form-control" name="dateOfOpening" id="dateOfOpening"
                                                onChange={(event) => setDateOfOpening(event.target.value)} value={date} />
                                        </div>
                                    </div>



                                    <div className="row">
                                        <div className="form-group col-md">
                                            <label forhtml="minBalance">Minimum Balance :</label>
                                            <input type="number" className="form-control" name="minBalance" id="minBalance"
                                                onChange={(event) => setMinBalance(event.target.value)} value={minBalance} disabled />
                                        </div>

                                        <div className="form-group col-md">
                                            <label forhtml="fine">Fine :</label>
                                            <input type="number" className="form-control" name="fine" id="fine"
                                                onChange={(event) => setFine(event.target.value)} value={fine} disabled />
                                        </div>
                                    </div>

                                    <button className="btn btn-primary btn-block" onClick={handleSubmit}>Create</button>
                                </div>

                            </div>

                            {/* <div className="modal-footer">
                            <button type="button" className="btn btn-primary">Log in</button>
                        </div> */}

                        </div>
                    </div>
                </div>


                <div className="container" id="term" style={{ display: 'none' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Create Term Account</h5>
                            </div>

                            <div className="modal-body">
                                {
                                    message &&
                                    <div className="alert alert-danger">{message}</div>
                                }

                                <div className="container text-left" style={{ lineHeight: '2.5' }}>
                                    <div className="form-group">
                                        <label forhtml="interestRate">Interest Rate :</label>
                                        <input type="number" className="form-control" name="interestRate" id="interestRate"
                                            onChange={(event) => setInterestRate(event.target.value)} value={insterestRate} disabled />
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-md">
                                            <label forhtml="balance">Balance :</label>
                                            <input type="number" className="form-control" name="balance" id="balance"
                                                onChange={(event) => setBalance(event.target.value)} placeholder="Enter your Amount" value={balance} />
                                        </div>

                                        <div className="form-group col-md">
                                            <label forhtml="dateOfOpening">Date :</label>
                                            <input type="date" className="form-control" name="dateOfOpening" id="dateOfOpening"
                                                onChange={(event) => setDateOfOpening(event.target.value)} value={date} />
                                        </div>
                                    </div>



                                    <div className="row">
                                        <div className="form-group col-md">
                                            <label forhtml="amount">Amount :</label>
                                            <input type="number" className="form-control" name="amount" id="amount"
                                                onChange={(event) => setAmount(event.target.value)} value={amount} />
                                        </div>

                                        <div className="form-group col-md">
                                            <label forhtml="months">Months :</label>
                                            <input type="number" className="form-control" name="months" id="months"
                                                onChange={(event) => setMonths(event.target.value)} value={months} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label forhtml="penalty">Penalty Amount :</label>
                                        <input type="number" className="form-control" name="penalty" id="penalty"
                                            onChange={(event) => setPenalty(event.target.value)} value={penalty} disabled />
                                    </div>

                                    <button className="btn btn-primary btn-block" onClick={handleSubmitTerm}>Create</button>
                                </div>

                            </div>

                            {/* <div className="modal-footer">
                            <button type="button" className="btn btn-primary">Log in</button>
                        </div> */}

                        </div>
                    </div>
                </div>

            </div>



            <div className="transaction" style={{ width: '600px' }}>


                <div className="container p-3">

                    <p><b>Transactions</b></p>

                    {
                        accounts.map(p => <tr key={p.accountId} >
                            <td >{p.accountId}</td>
                            <td><Link to={`/customer/all/transaction/account/${p.accountId}`}>Transaction Details</Link></td>
                        </tr>)}



                </div>


            </div>

        </div>
    )
}

export default CustomerDashboard;