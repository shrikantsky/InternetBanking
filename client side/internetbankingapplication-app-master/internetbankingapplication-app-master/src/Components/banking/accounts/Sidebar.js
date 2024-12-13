import React from "react";

import { Link } from "react-router-dom";
import CustomerLogout from "../customer/CustomerLogout";

function Sidebar() {

    const user = JSON.parse(localStorage.getItem('loginuser'));

    // const [myclass, changeclass] = useState("");
    // const addclass = () => {
    //     document.querySelector("#dashboard").classList.remove('active');
    //     document.querySelector("#accounts").classList.add('active');
    // }

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark" style={{ width: '200px', color: '#fff' }}>
            <div className="container">
                <h3>IBA</h3>
            </div>

            <hr />

            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/customer/dashboard">
                        <p className="nav-link" id="dashboard">Dashboard</p>
                    </Link>
                </li>
                <li>
                    <Link to={`/customer/accounts/${user.id}`}>
                        <p className="nav-link active" id="accounts">Accounts</p>
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
    )
}

export default Sidebar;