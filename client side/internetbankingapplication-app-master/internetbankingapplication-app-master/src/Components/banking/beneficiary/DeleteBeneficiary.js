import React, { useState, useEffect } from "react";

import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../accounts/Sidebar";

function DeleteBeneficiary() {

    const [beneficiary, SetBeneficiary] = useState(null);
    const { id } = useParams();

    const navigate = useNavigate();
    const user=JSON.parse(localStorage.getItem('loginuser'));
    const a = JSON.parse(localStorage.getItem('account'));

    useEffect(() => {
        axios.get("http://localhost:8080/beneficiary/find/" + id).then(resp => SetBeneficiary(resp.data))
    }, [id]);

    const handleDelete = () => {
        axios.delete("http://localhost:8080/beneficiary/delete/" + id).then(resp => {
            alert("Beneficiary Deleted");
            navigate(`/customer/accounts/details/${a.accountId}`);
        });
    }

    return (
        <div className="wrapper">

            <Sidebar />

            <div className="container bg-light">
                <div className="p-3">
                    <h2>Delete Beneficiary</h2>
                </div>

                {
                    beneficiary != null &&
                    <div>
                        <table className="table">
                            <tr>
                                <td>Beneficiary Id :</td>
                                <td><b>{beneficiary.beneficiaryId}</b></td>
                            </tr>
                            <tr>
                                <td>Beneficiary IFSC:</td>
                                <td><b>{beneficiary.ifsc}</b></td>
                            </tr>
                            <tr>
                                <td>Account Type:</td>
                                <td><b>{beneficiary.accountType}</b></td>
                            </tr>
                            <tr>
                                <td>Beneficiary Account Number:</td>
                                <td><b>{beneficiary.beneficiaryAccNo}</b></td>
                            </tr>
                            <tr>
                                <td>Beneficiary Account Name:</td>
                                <td><b>{beneficiary.beneficiaryName}</b></td>
                            </tr>
                            <tr>
                                <td> Account Id:</td>
                                <td><b>{beneficiary.account.accountId}</b></td>
                            </tr>
                        </table>

                        <div>
                            <button className="btn btn-danger m-3" onClick={handleDelete}>Delete</button>
                            <Link to={`/customer/account/beneficiary/${beneficiary.beneficiaryId}`} className="btn btn-secondary m-3">Back</Link>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default DeleteBeneficiary;