import React, { useState } from "react";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";


function AddCustomer() {

    const [custName, setCustName] = useState('');
    const [custEmail, setCustEmail] = useState('');
    const [custGender, setCustGender] = useState('');
    const [custAge, setCustAge] = useState('');
    const [custPhoneNo, setCustPhoneNo] = useState('');
    const [custPassword, setCustPassword] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate()



    const options = ['MALE', 'FEMALE'];

    const onOptionChangeHandler = (event) => {

        console.log("User Selected Value - ", event.target.value);

        setCustGender(event.target.value);

    }



    const handelSubmit = () => {



        let errors = {};
        if (!custName) {
            errors['custNameError'] = "Name is required"
        }
        if (!custEmail) {
            errors['custEmailError'] = "Email is required"
        }
        if (!custGender) {
            errors['custGenderError'] = "select gender"
        }
        if (!custAge) {
            errors['custAge'] = "Age is required"
        }
        if (!custPhoneNo) {
            errors['custPhoneError'] = "Phone No is required"
        }
        if (custPassword.length < 5) {
            errors['custPsswordError'] = "please enter miniumum 5 char"
        }

        setFormErrors(errors);

        const noErrors = Object.keys(errors).length === 0;

        if (noErrors) {
            const payload = {
                customerName: custName,
                role:'CUSTOMER',
                emailId: custEmail,
                gender: custGender,
                age: custAge,
                phoneNo: custPhoneNo,
                password: custPassword
            }

            axios.post("http://localhost:8080/customer/add", payload)
                .then(resp => {
                    alert("your Account Id  : " + resp.data.userId);
                    navigate("/");
                });

        }



    }

    return (

        <div className="main"  >


            <div className="container-fluid " >
                <div className="form-group"  >
                    <label forHtml="custName">Name: </label>
                    <input type="text" className="form-control" name="custName" id="custName" value={custName}
                        onChange={(event) => setCustName(event.target.value)} placeholder="Enter Customer Name" />
                    {
                        formErrors.custNameError && <div style={{ color: "red" }}> {formErrors.custNameError}</div>
                    }

                </div>

                <div className="form-group">
                    <label forHtml="custEmail"> Email : </label>
                    <input type="text" className="form-control" name="custEmail" id="custEmail" value={custEmail}
                        onChange={(event) => setCustEmail(event.target.value)} placeholder="Enter Email" />
                    {
                        formErrors.custEmailError && <div style={{ color: "red" }}> {formErrors.custEmailError}</div>
                    }

                </div>

                <div className="form-group">
                    <label forHtml="custAge">Age: </label>
                    <input type="text" className="form-control" name="custAge" id="custAge" value={custAge}
                        onChange={(event) => setCustAge(event.target.value)} placeholder="enter age" />
                    {
                        formErrors.custAge && <div style={{ color: "red" }}> {formErrors.custEmailError}</div>
                    }

                </div>

                <div className="form-group">
                    <label forHtml="custGender">Gender: </label>

                    {/* <input type="text" className="form-control" name="custGender" id="custGender" value={custGender}
                    onChange={(event) => setCustGender(event.target.value)} placeholder="enter Gender" /> */}

                    <select className="form-control" name="custGender" id="custGender" value={custGender}

                        onChange={onOptionChangeHandler} >

                        <option>Please choose one option</option>

                        {options.map((option, index) => {

                            return <option key={index} >

                                {option}

                            </option>

                        })}

                    </select>
                    {
                        formErrors.custGenderError && <div style={{ color: "red" }}> {formErrors.custGenderError}</div>
                    }


                </div>

                <div className="form-group">
                    <label forHtml="custPhoneNo">phone No : </label>
                    <input type="text" className="form-control" name="custPhoneNo" id="custPhoneNo" value={custPhoneNo}
                        onChange={(event) => setCustPhoneNo(event.target.value)} placeholder="Enter Phone no" />
                    {
                        formErrors.custPhoneError && <div style={{ color: "red" }}> {formErrors.custPhoneError}</div>
                    }

                </div>

                <div className="form-group">
                    <label forHtml="CreatedOn">Password : </label>
                    <input type="password" className="form-control" name="custPassword" id="custPassword" value={custPassword}
                        onChange={(event) => setCustPassword(event.target.value)} placeholder="Enter Password" />
                    {
                        formErrors.custPsswordError && <div style={{ color: "red" }}> {formErrors.custPsswordError}</div>
                    }
                </div>
                


                <button className="btn btn-primary" onClick={handelSubmit}>Submit</button><br></br>
                <Link to="/" className="btn btn-danger">Back to Home</Link>


            </div>


        </div>
    )
}

export default AddCustomer;