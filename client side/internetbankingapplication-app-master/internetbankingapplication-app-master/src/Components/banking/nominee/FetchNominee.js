import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../accounts/Sidebar";
function FetchNominee() {

    const a = JSON.parse(localStorage.getItem('account'));

    const [nominee, setNominee] = useState(null);

    const { id } = useParams();

    useEffect(() => {

        axios.get("http://localhost:8080/nominee/find/" + id).then(resp => setNominee(resp.data));

    }, [id]);
    return (
        <div className="wrapper">

            <Sidebar />

            <div className="container">

                <div className="p-3">
                    <h2>Details of Nominee</h2>
                </div>

                <div className="container">
                    {
                        nominee !== null &&
                        <table className="table bg-light">
                            <tr>
                                <td>Id :</td>
                                <td><b>{nominee.nomineeId}</b></td>
                            </tr>
                            <tr>
                                <td>Name :</td>
                                <td><b>{nominee.name}</b></td>
                            </tr>
                            <tr>
                                <td>Govt Id :</td>
                                <td><b>{nominee.govtId}</b></td>
                            </tr>
                            <tr>
                                <td>Govt Id Type :</td>
                                <td><b>{nominee.govtIdType}</b></td>
                            </tr>
                            <tr>
                                <td>Phone Number :</td>
                                <td><b>{nominee.phoneNo}</b></td>
                            </tr>
                            <tr>
                                <td>Relation :</td>
                                <td><b>{nominee.relation}</b></td>
                            </tr>
                            <tr>
                                <td>Account Id :</td>
                                <td><b>{nominee.account.accountId}</b></td>
                            </tr>

                            <Link to={`/customer/accounts/details/${a.accountId}`} className="btn btn-secondary m-3">Back</Link>
                            <Link to={`/customer/account/nominee/update/${nominee.nomineeId}`} className="btn btn-info m-3">Update</Link>
                            <Link to={`/customer/account/nominee/delete/${nominee.nomineeId}`} className="btn btn-danger m-3">Delete</Link>

                        </table>
                    }
                </div>

            </div>
        </div>
    )

}



export default FetchNominee;