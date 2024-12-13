import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AdminLogout from "../admin/AdminLogout";
import axios from 'axios';


function UpdateCustomer() {

    const [custUserId, setUserId] = useState('');
    const [custName, setCustName] = useState('');
    const [custEmail, setCustEmail] = useState('');
    const [custGender, setCustGender] = useState('');
    const [custAge, setCustAge] = useState('');
    const [custPhoneNo, setCustPhoneNo] = useState('');
    const [custPassword, setCustPassword] = useState('');

    const options = ['MALE', 'FEMALE'];

    const onOptionChangeHandler = (event) => {
        console.log("User Selected Value - ", event.target.value);
        setCustGender(event.target.value);
    }

    const { id } = useParams();

    const bal = JSON.parse(localStorage.getItem('minBal'));
    
    const payload = {

        userId: custUserId,
        customerName: custName,
        emailId: custEmail,
        gender: custGender,
        age: custAge,
        phoneNo: custPhoneNo,
        password: custPassword

    }

    useEffect(() => {
        axios.get("http://localhost:8080/customer/find/" + id).then(resp => {

            setUserId(resp.data.userId);
            setCustName(resp.data.customerName);
            setCustEmail(resp.data.emailId);
            setCustAge(resp.data.age);
            setCustPhoneNo(resp.data.phoneNo);
            setCustPassword(resp.data.password);
        })
    }, [id]);


    const handelSubmit = () => {

        const payload = {
            userId: custUserId,
            customerName: custName,
            emailId: custEmail,
            gender: custGender,
            age: custAge,
            phoneNo: custPhoneNo,
            password: custPassword
        }

        axios.put("http://localhost:8080/customer/update", payload).then(resp => 
            alert("Customer updated  successfully with Id : " + resp.data.userId)
        );
    }

    return (

        <div className="wrapper">
            <div className="d-flex flex-column p-3 flex-shrink-0 bg-dark" style={{ width: '200px', color: '#fff' , height:'100vh' }}>
                <div className="container">
                    <h3>IBA</h3>
                    <p>Admin</p>
                </div>

                <hr />

                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item" style={{ textDecoration: 'none' }}>
                        <Link to="/admin/dashboard">
                            <p className="nav-link" aria-current="page">Dashboard</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/transaction">
                            <p className="nav-link ">Transaction</p>
                        </Link>
                    </li>

                    <hr />

                    <li>
                        <p className="nav-link logout">
                            <AdminLogout/>
                        </p>
                    </li>
                </ul>
            </div>


            <div className="container">
                <div className="p-3">
                    <h3>Update Customer</h3>
                </div>

                <div className="container">
                    <div className="form-group">
                        <label htmlFor="custUserId">Customer Id :</label>
                        <input type="text" className="form-control" name="custUserId" id="custUserId" value={custUserId}
                            onChange={(event) => setUserId(event.target.value)} disabled />
                    </div>

                    <div className="form-group">
                        <label forHtml="custName">Name :</label>
                        <input type="text" className="form-control" name="custName" id="custName" value={custName}
                            onChange={(event) => setCustName(event.target.value)} />
                    </div>

                    <div className="form-group">
                        <label forHtml="custEmail">Email :</label>
                        <input type="text" className="form-control" name="custEmail" id="custEmail" value={custEmail}
                            onChange={(event) => setCustEmail(event.target.value)} />
                    </div>

                    <div className="row">
                        <div className="form-group col-md">
                            <label forHtml="custAge">Age :</label>
                            <input type="text" className="form-control" name="custAge" id="custAge" value={custAge}
                                onChange={(event) => setCustAge(event.target.value)} />
                        </div>

                        <div className="form-group col-md">
                            <label forHtml="custGender">Gender :</label>
                            <select className="form-control" name="custGender" id="custGender" value={custGender}
                                onChange={onOptionChangeHandler} >

                                <option>Please choose one option</option>
                                {options.map((option, index) => {
                                    return <option key={index} >
                                        {option}
                                    </option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label forHtml="custPhoneNo">Phone No :</label>
                        <input type="text" className="form-control" name="custPhoneNo" id="custPhoneNo" value={custPhoneNo}
                            onChange={(event) => setCustPhoneNo(event.target.value)} />
                    </div>

                    <div>
                        <button className="btn btn-primary" onClick={handelSubmit}>Update</button>
                        <Link to={`/admin/customer/all/${bal}`} className="btn btn-danger m-3">Back</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UpdateCustomer;
