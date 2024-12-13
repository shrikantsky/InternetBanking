import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Link } from "react-router-dom";

import axios from "axios";
import Sidebar from "../accounts/Sidebar";

function UpdateBeneficiary() {

    const [benId, setbenId] = useState('');
    const [bName, setbName] = useState('');
    const [bAccNo, setbAccNo] = useState('');
    const [accId, setAccId] = useState('');
    const [AccType, setAccType] = useState('');
    const [IFSC, setIfsc] = useState('');


    const { id } = useParams();

    const navigate = useNavigate();
    const a = JSON.parse(localStorage.getItem('account'));

    useEffect(() => {
        axios.get("http://localhost:8080/beneficiary/find/" + id).then(resp => {

            setbenId(resp.data.beneficiaryId);
            setbName(resp.data.beneficiaryName);
            setbAccNo(resp.data.beneficiaryAccNo);
            setAccType(resp.data.accountType);
            setAccId(resp.data.account.accountId);
            setIfsc(resp.data.ifsc);

        })
    }, [id]);

    const handleSubmit = () => {
        const payload = {
            beneficiaryId: benId,
            beneficiaryName: bName,
            beneficiaryAccNo: bAccNo,
            accountType: AccType,
            account: {
                accountId: accId
            },
            ifsc: IFSC
        }

        axios.put("http://localhost:8080/beneficiary/update", payload)
            .then(resp => {
                alert("Product Updated successfully with Id : " + resp.data.beneficiaryId);
                navigate(`/customer/accounts/details/${a.accountId}`);
            });

    }

    return (
        <div className="wrapper">

            <Sidebar />

            <div className="container">
                <div className="p-3">
                    <h2>Update Beneficiary</h2>
                </div>

                <div className="container bg-light">
                    <div className="row">
                        <div className="form-group col-md">
                            <label htmlFor="bName">Beneficiary Name : </label>
                            <input type="text" className="form-control" name="bName" id="bName" value={bName}
                                onChange={(event) => setbName(event.target.value)} />
                        </div>

                        <div className="form-group col-md">
                            <label htmlFor="bAccNo">Beneficiary Account No : </label>
                            <input type="text" className="form-control" name="bAccNo" id="bAccNo" value={bAccNo}
                                onChange={(event) => setbAccNo(event.target.value)} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="accId">Account Id : </label>
                        <input type="text" className="form-control" name="accId" id="accId" value={accId}
                            onChange={(event) => setAccId(event.target.value)} disabled />
                    </div>



                    <div className="form-group">
                        <label htmlFor="AccType">Beneficiary Account Type : </label>
                        <input type="text" className="form-control" name="AccType" id="AccType" value={AccType}
                            onChange={(event) => setAccType(event.target.value)} />
                    </div>


                    <div className="form-group">
                        <label htmlFor="IFSC">IFSC Number: </label>
                        <input type="name" className="form-control" name="ISFC" id="IFSC" value={IFSC}
                            onChange={(event) => setIfsc(event.target.value)} />
                    </div>


                    <button className="btn btn-primary btn-block" onClick={handleSubmit}>Update</button>

                    <div className="text-center p-3">
                        <Link to={`/customer/account/beneficiary/${benId}`} className="btn btn-danger btn-sm">Back to Home</Link>
                    </div> 
                </div>

            </div>
        </div>

    )
}

export default UpdateBeneficiary;