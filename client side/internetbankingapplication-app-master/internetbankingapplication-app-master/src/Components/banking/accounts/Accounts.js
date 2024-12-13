import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

function Accounts() {

   // const user = JSON.parse(localStorage.getItem('loginuser'));

    const [accounts, setAccounts] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        axios.get("http://localhost:8080/account/all/" + id).then(resp => {
            setAccounts(resp.data);
            localStorage.setItem('account', JSON.stringify(resp.data));
        })
    }, [id]);

    return (
        <div className="wrapper">

            <Sidebar/>
            
     

            <div className="container">
                <div className="p-3">
                    <h3>Accounts</h3>
                </div>

                <div className="container p-3">
                    <p><b>My Accounts</b></p>
                    <div className="container row">
                        {
                            accounts.map(a => <table className="table col bg-light m-3" key={a.accountId}>
                                <tr>
                                    <td>Account Id :</td>
                                    <td><b>{a.accountId}</b></td>
                                </tr>
                                <tr>
                                    <td>Balance :</td>
                                    <td><b>{a.balance}</b></td>
                                </tr>
                                <tr>
                                    <td><Link to={`/customer/accounts/details/${a.accountId}`} className="text-info">View Details</Link></td>
                                    <td><p className="text-danger">Delete Account</p></td>
                                </tr>
                            </table>
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Accounts;