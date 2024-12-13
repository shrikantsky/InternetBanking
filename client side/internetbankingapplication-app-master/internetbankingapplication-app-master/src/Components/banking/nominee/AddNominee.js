import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../accounts/Sidebar";

function AddNominee() {

    const a = JSON.parse(localStorage.getItem('account'));

    const [nName, setNName] = useState('');
    const [ngovtid, setNGovtId] = useState('');
    const [ngovttype, setNGovtType] = useState('');
    const [nphnno, setNPhnNo] = useState('');
    const [nrelation, setNRelation] = useState('');
    //const [accid, setNAccId] = useState('');

    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();

    const handleSubmit = () => {
        let errors = {};
        if (!nName) {
            errors['nNameError'] = " Nominee name is required"
        }


        if (!ngovtid) {
            errors['nGovtIdError'] = "  GovtId is required"
        }


        if (!ngovttype) {
            errors['nGovtTypeError'] = "  GovtIdType is required"
        }

        if (!nphnno) {
            errors['nPhnNoError'] = "  Phone number is required"
        }
        if (!nrelation) {
            errors['nRelation'] = "  Relation is required"
        }
        if (!nphnno) {
            errors['accid'] = "  Account Id is required"
        }

        const payload = {
            name: nName,
            govtId: ngovtid,
            govtIdType: ngovttype,
            relation: nrelation,
            account: {
                accountId: a.accountId
            },
            phoneNo: nphnno,
        }
        setFormErrors(errors);

       // const noErrors = Object.keys(errors).length === 0;
        axios.post("http://localhost:8080/nominee/add", payload).then(resp => {
            alert("Nominee is added successfully with AccountId : " + resp.data.account.accountId);
            navigate(`/customer/accounts/details/${a.accountId}`);
        });
    }

    return (

        <div className="wrapper">

            <Sidebar />

            <div className="container">
                <div className="p-3">
                    <h2>Add Nominee</h2>
                </div>

                <div className="container bg-light p-5">
                    <div className="form-group">
                        <label htmlFor="nName"> Customer Name :</label>
                        <input type="Text" className="form-control" name="nName" id="nName" value={nName}
                            onChange={(event) => setNName(event.target.value)} placeholder="Enter Nominee Name" />
                        {
                            formErrors.nNameError && <div style={{ color: "red" }} >{formErrors.nNameError}</div>
                        }
                    </div>

                    <div className="row">
                        <div className="form-group col-md">
                            <label htmlFor="ngovtid"> Govt Id :</label>
                            <input type="Text" className="form-control" name="govtid" id="nGovtId" value={ngovtid}
                                onChange={(event) => setNGovtId(event.target.value)} placeholder="Enter Govt Id" />
                            {
                                formErrors.nGovtIdError && <div style={{ color: "red" }} >{formErrors.nGovtIdError}</div>
                            }
                        </div>

                        <div className="form-group col-md">
                            <label htmlFor="ngovttype"> Govt Type :</label>
                            <input type="Text" className="form-control" name="govttype" id="nGovtType" value={ngovttype}
                                onChange={(event) => setNGovtType(event.target.value)} placeholder="Enter Govt Type" />
                            {
                                formErrors.nGovtTypeError && <div style={{ color: "red" }} >{formErrors.nGovtTypeError}</div>
                            }
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-md">
                            <label htmlFor="nphnno"> Phone Number :</label>
                            <input type="Text" className="form-control" name="phnno" id="nPhnNo" value={nphnno}
                                onChange={(event) => setNPhnNo(event.target.value)} placeholder="Enter Phone Number" />
                            {
                                formErrors.nPhnNoError && <div style={{ color: "red" }} >{formErrors.nPhnNoError}</div>
                            }
                        </div>


                        <div className="form-group col-md">
                            <label htmlFor="nrelation"> Relation : </label>
                            <input type="Text" className="form-control" name="relation" id="nRelation" value={nrelation}
                                onChange={(event) => setNRelation(event.target.value)} placeholder="Enter relation" />
                            {
                                formErrors.nRelation && <div style={{ color: "red" }} >{formErrors.nRelation}</div>
                            }
                        </div>
                    </div>


                    <div className="form-group">

                        <label htmlFor="" accid> Account Id :</label>
                        <input type="Text" className="form-control" name="accid" id="Accid" value={a.accountId} disabled/>
                        {
                            formErrors.accid && <div style={{ color: "red" }} >{formErrors.accid}</div>
                        }
                    </div>

                    <button className="btn btn-primary btn-block" onClick={handleSubmit}>Submit</button>

                    <div className="text-center">
                        <br></br>
                        <Link to={`/customer/accounts/details/${a.accountId}`} className="btn btn-danger">Back to Home</Link>

                    </div>
                </div>

            </div>
        </div>

    )

}



export default AddNominee;
