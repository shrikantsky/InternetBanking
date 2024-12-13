import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Link } from "react-router-dom";

import axios from "axios";
import Sidebar from "../accounts/Sidebar";

function UpdateNominee() {

    const [nnomineeid, setNNomineeId] = useState('');
    const [nName, setNName] = useState('');
    const [ngovtid, setNGovtId] = useState('');
    const [ngovtidtype, setNGovtIdType] = useState('');
    const [nphnno, setNPhnNo] = useState('');
    const [nrelation, setNRelation] = useState('');
    const [accid, setNAccId] = useState('');
   
    const a = JSON.parse(localStorage.getItem('account'));
    const { id } = useParams();

    const navigate = useNavigate();

    // fetch the data by id
    useEffect(() => {   // it take two argument to execute only once
        axios.get("http://localhost:8080/nominee/find/" + id).then(resp => {
            setNNomineeId(resp.data.nomineeId);
            setNName(resp.data.name);
            setNGovtId(resp.data.govtId);
            setNGovtIdType(resp.data.govtIdType);
            setNPhnNo(resp.data.phoneNo);
            setNRelation(resp.data.relation);
            setNAccId(resp.data.account.accountId);
        });
    }, [id]);

    const handleSubmit = () => {
        const payload = {

            nomineeId: nnomineeid,
            name: nName,
            govtId: ngovtid,
            govtIdType: ngovtidtype,
            relation: nrelation,
            account: {
                accountId: accid
            },
            phoneNo: nphnno
        }

        axios.put("http://localhost:8080/nominee/update", payload)
            .then(resp => {
                alert("Nominee Updated successfully with Id : " + resp.data.nomineeId);
                navigate(`/customer/accounts/details/${a.accountId}`);
            });

    }

    return (
        <div className="wrapper">

            <Sidebar />

            <div className="container">
                <div className="p-3">
                    <h2>Update Nominee</h2>
                </div>

                <div className="container bg-light">
                    {/* <div className="form-group">
                        <label htmlfor="nnomineeid"> Nominee Id  </label>
                        <input type="Text" className="form-control" name="nnomineeid" id="nnomineeid" value={nnomineeid}
                            onChange={(event) => setNNomineeId(event.target.value)} />
                    </div> */}

                    <div className="form-group">
                        <label htmlfor="nName"> Nominee Name  </label>
                        <input type="Text" className="form-control" name="nName" id="nName" value={nName}
                            onChange={(event) => setNName(event.target.value)} />
                    </div>

                    <div className="row">
                        <div className="form-group col-md">
                            <label htmlfor="ngovtId"> Govt Id </label>
                            <input type="Text" className="form-control" name="govtId" id="nGovtId" value={ngovtid}
                                onChange={(event) => setNGovtId(event.target.value)} />
                        </div>

                        <div className="form-group col-md">
                            <label htmlfor="ngovtIdType"> Govt Id Type </label>
                            <input type="Text" className="form-control" name="govtIdType" id="nGovtIdType" value={ngovtidtype}
                                onChange={(event) => setNGovtIdType(event.target.value)} />
                        </div>

                    </div>

                    <div className="row">
                        <div className="form-group col-md">
                            <label htmlfor="nphnno"> Phone Number </label>
                            <input type="Text" className="form-control" name="phnno" id="nPhnNo" value={nphnno}
                                onChange={(event) => setNPhnNo(event.target.value)} />
                        </div>


                        <div className="form-group col-md">
                            <label htmlfor="nrelation"> Relation </label>
                            <input type="Text" className="form-control" name="relation" id="nRelation" value={nrelation}
                                onChange={(event) => setNRelation(event.target.value)} />
                        </div>
                    </div>


                    <div className="form-group">
                        <label htmlfor="accid"> Account Id </label>
                        <input type="Text" className="form-control" name="accid" id="nAccid" value={accid}
                            onChange={(event) => setNAccId(event.target.value)} />
                    </div>


                    <button className="btn btn-primary btn-block" onClick={handleSubmit}>Update</button>

                    <div className="text-center p-3">
                        <Link to={`/customer/account/nominee/${nnomineeid}`} className="btn btn-danger">Back to Home</Link>
                    </div>
                </div>


            </div>
        </div>
    )
}



export default UpdateNominee;