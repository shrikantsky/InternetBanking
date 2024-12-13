import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../accounts/Sidebar";

function FetchBeneficiary() {

    const a = JSON.parse(localStorage.getItem('account'));

    const [b, SetBeneficiary] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        axios.get("http://localhost:8080/beneficiary/find/" + id).then(resp => SetBeneficiary(resp.data));
    }, [id]);

    return (
        <div className="wrapper">

            <Sidebar />

            <div className="container">

                <div className="p-3">
                    <h2>Details of Beneficiary</h2>
                </div>

                <div className="container">
                    {
                        b !== null &&
                        <table className="table bg-light">
                            <tr>
                                <td>Beneficiary Account Id :</td>
                                <td><b>{b.beneficiaryId}</b></td>
                            </tr>
                            <tr>
                                <td>Beneficiary Account Name :</td>
                                <td><b>{b.beneficiaryName}</b></td>
                            </tr>
                            <tr>
                                <td>Beneficiary Account No :</td>
                                <td><b>{b.beneficiaryAccNo}</b></td>
                            </tr>
                            <tr>
                                <td>Beneficiary IFSC :</td>
                                <td><b>{b.ifsc}</b></td>
                            </tr>
                            <tr>
                                <td>Beneficiary Account Type :</td>
                                <td><b>{b.accountType}</b></td>
                            </tr>
                            <tr>
                                <td>Account Id :</td>
                                <td><b>{b.account.accountId}</b></td>
                            </tr>

                            <Link to={`/customer/accounts/details/${a.accountId}`} className="btn btn-secondary m-3">Back</Link>
                            <Link to={`/customer/account/beneficiary/update/${b.beneficiaryId}`} className="btn btn-info m-3">Update</Link>
                            <Link to={`/customer/account/beneficiary/delete/${b.beneficiaryId}`} className="btn btn-danger m-3">Delete</Link>
                     
                        </table>
                    }

                </div>                  
            </div>
        </div>
    )
}


export default FetchBeneficiary;