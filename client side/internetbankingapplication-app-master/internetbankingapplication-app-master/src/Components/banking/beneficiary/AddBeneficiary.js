import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../accounts/Sidebar";

function AddBeneficiary() {

    const a = JSON.parse(localStorage.getItem('account'));

    const [bName, setbName] = useState('');
    const [bAccNo, setbAccNo] = useState('');
    const [AccType, setAccType] = useState('');
    const [IFSC, setIfsc] = useState('');

    const [formErrors, setFormErrors] = useState({});
    

    const navigate = useNavigate();

    const handleSubmit = () => {
        let errors = {};

        if (!bName) {
            errors['bNameError'] = " Beneficiary name is required"
        }

        if (!bAccNo) {
            errors['bAccNoError'] = " Beneficiary Account Number is required"
        }

        if (!AccType) {
            errors['AcctypeError'] = " Account Type  is Required"
        }

        if (!IFSC) {
            errors['IFSCError'] = " IFSC  is Required"
        }

        setFormErrors(errors);



        const payload = {

            beneficiaryName: bName,
            beneficiaryAccNo: bAccNo,
            accountType: AccType,
            account: {
                accountId: a.accountId
            },
            ifsc: IFSC
        }

        axios.post("http://localhost:8080/beneficiary/add/", payload).then(resp => {
                alert("New Beneficiary Added Succesfully !: " + resp.data.account.accountId);
                navigate(`/customer/accounts/details/${a.accountId}`);
            })
    }

    return (

        <div className="wrapper">

            <Sidebar></Sidebar>

            <div className="container">
                <div className="p-3">
                    <h3>Add Beneficiary</h3>
                </div>

                <div className="container bg-light p-5">
                    <div className="row">
                        <div className="form-group col-md">
                            <label htmlFor="bName">Beneficiary Name : </label>
                            <input type="text" className="form-control" name="bName" id="bName" value={bName}
                                onChange={(event) => setbName(event.target.value)} />
                            {
                                formErrors.bNameError && <div style={{ color: "red" }} >{formErrors.bNameError}</div>

                            }
                        </div>


                        <div className="form-group col-md">
                            <label htmlFor="bAccNo">Beneficiary Account Number : </label>
                            <input type="text" className="form-control" name="bAccNo" id="bAccNo" value={bAccNo}
                                onChange={(event) => setbAccNo(event.target.value)} />
                            {
                                formErrors.bAccNoError && <div style={{ color: "red" }} >{formErrors.bAccNoError}</div>

                            }
                        </div>
                    </div>




                    <div className="form-group">
                        <label htmlFor="accId">Customer Account Id : </label>
                        <input type="text" className="form-control" name="accId" id="accId" value={a.accountId} disabled />
                    </div>

                    <div className="form-group">
                        <label htmlFor="AccType">Beneficiary Account Type : </label>
                        <input type="text" className="form-control" name="AccType" id="AccType" value={AccType}
                            onChange={(event) => setAccType(event.target.value)} />
                        {
                            formErrors.AcctypeError && <div style={{ color: "red" }} >{formErrors.AcctypeError}</div>

                        }
                    </div>


                    <div className="form-group">
                        <label htmlFor="IFSC">IFSC Number: </label>
                        <input type="name" className="form-control" name="ISFC" id="IFSC" value={IFSC}
                            onChange={(event) => setIfsc(event.target.value)} />
                        {
                            formErrors.IFSCError && <div style={{ color: "red" }} >{formErrors.IFSCError}</div>

                        }
                    </div>

                    <button className="btn btn-primary btn-block" onClick={handleSubmit}>Submit</button>

                        <div className="text-center p-3">
                            <Link to={`/customer/accounts/details/${a.accountId}`} className="btn btn-danger btn-sm">Back to Home</Link>
                        </div>
                    </div>

            </div>
        </div>

    )

}


export default AddBeneficiary;
