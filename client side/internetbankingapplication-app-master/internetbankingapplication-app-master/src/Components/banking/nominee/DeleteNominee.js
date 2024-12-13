import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../accounts/Sidebar";

function DeleteNominee() {

    const [nominee, setNominee] = useState(null);
    const { id } = useParams();
    const user=JSON.parse(localStorage.getItem('loginuser'));
    const a = JSON.parse(localStorage.getItem('account'));
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/nominee/find/" + id).then(resp => setNominee(resp.data))
    }, [id]);

    const handleDelete = () => {
        axios.delete("http://localhost:8080/nominee/delete/" + id).then(resp => {
            alert("Nominee Deleted");
            navigate(`/customer/accounts/details/${a.accountId}`);
        });
    }
    return (
        <div className="wrapper">

            <Sidebar />

            <div className="container bg-light">
                <div className="p-3">
                    <h2>Delete Nominee</h2>
                </div>

                <div className="container">
                    {
                        nominee != null &&
                        <div>

                            <table className="table">
                                <tr>
                                    <td>Nominee Id :</td>
                                    <td><b>{nominee.nomineeId}</b></td>
                                </tr>
                                <tr>
                                    <td>Nominee Name :</td>
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
                                    <td>Account Id :</td>
                                    <td><b>{nominee.account.accountId}</b></td>
                                </tr>
                            </table>

                            <div>
                                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                                <Link to={`/customer/account/nominee/${nominee.nomineeId}`} className="btn btn-secondary m-3">Back</Link>
                            </div>
                        </div>


                    }

                </div>

            </div>
        </div>
    )
}

export default DeleteNominee;