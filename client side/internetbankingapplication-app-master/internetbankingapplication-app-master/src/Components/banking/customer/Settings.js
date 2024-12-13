
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";
import CustomerLogout from "./CustomerLogout";



function Settings() {

    const user = JSON.parse(localStorage.getItem('loginuser'));
    const[custUserId,setUserId]= useState('');
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

    const { userId } = useParams();


    useEffect(() => {
        axios.get("http://localhost:8080/customer/find/" + user.userId).then(resp => {

            setUserId(resp.data.userId);
            setCustName(resp.data.customerName);
            setCustEmail(resp.data.emailId);
            setCustAge(resp.data.age);
            setCustPhoneNo(resp.data.phoneNo);
            setCustPassword(resp.data.password);

        }


        )

    }, [user.userId]);


    const handelSubmit = () => {

        const payload = {
            userId:custUserId,
            customerName: custName,
            emailId: custEmail,
            gender: custGender,
            age: custAge,
            phoneNo: custPhoneNo,
            password: custPassword
        }

        axios.put("http://localhost:8080/customer/update", payload)
            .then(resp => alert("Customer updated  successfully with Id : " + resp.data.userId));




    }
    
    return (
        <div className="wrapper text-left">

        <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark" style={{width: '200px', color: '#fff'}}>
            <div className="container">
                <h3>IBA</h3>
            </div>

            <hr/>

            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/customer/dashboard">
                        <p className="nav-link">Dashboard</p>
                    </Link>
                </li>
                <li>
                    <Link to={`/customer/accounts/${user.userId}`}>
                        <p className="nav-link">Accounts</p>
                    </Link>
                </li>
                <li>
                    <Link to="/customer/withdraw">
                        <p className="nav-link">Withdraw</p>
                    </Link>
                </li>
                <li>
                    <Link to="/customer/deposit">
                        <p className="nav-link">Deposit</p>
                    </Link>
                </li>
                <li>
                    <Link to="/customer/transfer">
                        <p className="nav-link">Transfer</p>
                    </Link>
                </li>
                <li>
                    <Link to="/customer/transactions">
                        <p className="nav-link">Transaction</p>
                    </Link> 
                </li>

                <hr/>

                <li className="nav-item">
                    <Link to="/customer/settings">
                    <p className="nav-link active">Settings</p>
                    </Link>
                </li>
                <li>
                    <p className="nav-link logout">
                    <CustomerLogout/>
                    </p>
                </li>

            </ul>

        </div>

        <div className="container">
            <div className="p-3">
                <h3>Account Settings</h3>
            </div>

           
            <div className="container"  >

           

            <div className="form-group">
                <label htmlFor="custUserId">coustomer Id : </label>
                <input type="text" className="form-control" name="custUserId" id="custUserId" value={custUserId}
                    onChange={(event) => setUserId(event.target.value)} disabled />
            </div>



        
            <div className="form-group">
                <label forHtml="custName">Name: </label>
                <input type="text" className="form-control" name="custName" id="custName" value={custName}
                    onChange={(event) => setCustName(event.target.value)} />


            </div>

            <div className="form-group">
                <label forHtml="custEmail"> Email : </label>
                <input type="text" className="form-control" name="custEmail" id="custEmail" value={custEmail}
                    onChange={(event) => setCustEmail(event.target.value)} />


            </div>

            <div className="form-group">
                <label forHtml="custAge">Age: </label>
                <input type="text" className="form-control" name="custAge" id="custAge" value={custAge}
                    onChange={(event) => setCustAge(event.target.value)} />


            </div>

            <div className="form-group">
                <label forHtml="custGender">Gender: </label>



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

            <div className="form-group">
                <label forHtml="custPhoneNo">phone No : </label>
                <input type="text" className="form-control" name="custPhoneNo" id="custPhoneNo" value={custPhoneNo}
                    onChange={(event) => setCustPhoneNo(event.target.value)} />


            </div>

        

            <button className="btn btn-primary" onClick={handelSubmit}>update</button>


            <div>
                <br></br>
                <Link to="/customer/dashboard" className="btn btn-danger">Customer Dashboard</Link>
            </div>


        </div>


        </div>

        <div className="transaction" style={{width: '600px'}}>
            <div className="container p-3">
                <p><b>Transactions</b></p>
            </div>

            
        </div>

    </div>
    )
}

export default Settings;