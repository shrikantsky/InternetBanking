import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import CustomerLogout from "../customer/CustomerLogout";

function AccountDetails() {

    const [account, setAccount] = useState(null);

    const [ben, setBeneficiary] = useState([]);
    
    const [nominee, setNominee] = useState([]);

    const { id } = useParams();

    const user = JSON.parse(localStorage.getItem('loginuser'));

    const a = JSON.parse(localStorage.getItem('account'));

    useEffect(() => {
        axios.get("http://localhost:8080/account/find/" + id).then(resp => {
            setAccount(resp.data);
            localStorage.setItem('account', JSON.stringify(resp.data));
        })
    }, [id]);


    useEffect(() => {
        axios.get("http://localhost:8080/beneficiary/all/" + a.accountId).then(resp => setBeneficiary(resp.data))
    }, [a.accountId]);


    useEffect(() => {
        axios.get("http://localhost:8080/nominee/all/" + a.accountId).then(resp => setNominee(resp.data))
    }, [a.accountId]);

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
                        <Link to={`/customer/accounts/${user.id}`}>
                            <p className="nav-link active">Accounts</p>
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
                            <CustomerLogout/>
                        </p>
                    </li>

                </ul>

            </div>

            <div className="container">
                <div className="p-3">
                    <h3>Account Details</h3>
                </div>

                {
                    account != null &&

                    <div className="container">
                        <table className="table bg-light">
                            <tr>
                                <td>Account Id :</td>
                                <td><b>{account.accountId}</b></td>
                            </tr>
                            <tr>
                                <td>Balance :</td>
                                <td><b>Rs. {account.balance}</b></td>
                            </tr>
                            <tr>
                                <td>Date :</td>
                                <td><b>{account.dateOfOpening}</b></td>
                            </tr>
                            <tr>
                                <td>Interest :</td>
                                <td><b>{account.interestRate}</b></td>
                            </tr>
                            <tr>
                                <td>Customer Id :</td>
                                <td><b>{account.customer.userId}</b></td>
                            </tr>
                        </table>

                        <Link to={`/customer/accounts/${user.userId}`} className="btn btn-danger">Back</Link>
                    </div>
                }

            </div>

            <div className="" style={{ width: '600px' }}>
                <div className="container p-3 h-50 d-inline-block">
                    <p><b>Nominees</b></p>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Relation</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            nominee.length > 0 &&

                            nominee.map(p => <tr key={p.nomineeId}>
                                    <td>{p.name}</td>
                                    <td>{p.relation}</td>
                                    <td>
                                        <Link to={`/customer/account/nominee/${p.nomineeId}`}>
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>

                    <Link to={'/customer/account/addnominee'} className="btn btn-primary btn-block btn-sm">Add Nominee</Link>
                </div>

                <div className="container p-3 h-50 d-inline-block">
                    <p><b>Beneficiary</b></p>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Account No</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            ben.length > 0 &&

                            ben.map(p => <tr key={p.beneficiaryId}>
                                    <td>{p.beneficiaryName}</td>
                                    <td>{p.beneficiaryAccNo}</td>
                                    <td>
                                        <Link to={`/customer/account/beneficiary/${p.beneficiaryId}`}>
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>

                    <Link to={'/customer/account/addbeneficiary'} className="btn btn-primary btn-block btn-sm">Add Beneficiary</Link>
                
                </div>
            </div>
        </div>
    )
}

export default AccountDetails;