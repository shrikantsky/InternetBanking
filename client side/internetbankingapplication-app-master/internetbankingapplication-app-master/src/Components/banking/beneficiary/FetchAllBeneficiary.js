import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function FetchAllBeneficiary() {

    const a = JSON.parse(localStorage.getItem('account'));

    const [ben, SetBeneficiary] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/beneficiary/all/"+a.accountId).then(resp => SetBeneficiary(resp.data))
    }, [a.accountId]);  

    return (
        <div className="container">
            <h2 style={{ color: "blue", textAlign: "center" }}>All Beneficiary</h2>

            {
                ben.length > 0 &&


                <table style={{ width: "100%" }} className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Beneficiary Id</th>
                            <th>IFSC</th>
                            <th>Account   Type</th>
                            <th>Beneficiary Account Number</th>
                            <th>Beneficiary Account Name</th>
                            <th> Account Id</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ben.map(b => <tr key={b.beneficiaryId}>
                                <td> {b.beneficiaryId} </td>
                                <td>{b.ifsc}</td>
                                <td>{b.accountType}</td>
                                <td> {b.beneficiaryAccNo} </td>
                                <td> {b.beneficiaryName} </td>
                                <td>{b.account.accountId}</td>
                                
                                <td ><Link to={`/beneficiary/update/${b.beneficiaryId}`}>update</Link></td>
                                <td ><Link to={`/beneficiary/find/${b.beneficiaryId}`}>view</Link></td>
                                <td ><Link to={`/beneficiary/delete/${b.beneficiaryId}`}>delete</Link></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            }
            <Link to="/">Back To Home</Link>
        </div>
    )
}


export default FetchAllBeneficiary;  