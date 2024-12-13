import React, { useEffect, useState } from "react";
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

function ReportTransaction() {
    //userid to taken dynamically
    const [accounts, setAccounts] = useState([]);
    const [transactionid, setTransactionId] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState('');


    const user=JSON.parse(localStorage.getItem('loginuser'));
    useEffect(() => { axios.get("http://localhost:8080/account/all/"+user.userId)
    .then(resp => setAccounts(resp.data)) }, [user.userId]
    )

const handleSubmit=()=>{
    let errors={};
    if (!transactionid) { errors['TransactionIdError'] = "Transaction Id Required" };

    
    setFormErrors(errors);
    const noErrors = Object.keys(errors).length === 0;
    if (noErrors) {
   navigate(`/customer/transaction/details/${transactionid}`);
    }
}


    return (<div className="container">
        <br></br>
        <h1>Transaction</h1>
        <br></br>  <br></br>

        <div className="row">

            <div className="col-sm-2" id="accountdetails">
                <h4>Account Details</h4>
                <hr />
                <h6>User Id:{userId}</h6>
                <hr />
                {accounts.map(p => <p key={p.accountId}>
                     <pre>{p.accountId}  {p.customer.customerName}</pre>
                     <hr />

</p>)}
             

            </div>

            <div className="col-sm-3" id="balance">
                <p >Transaction
                <span class="material-icons">
receipt_long
</span>
                </p>
            </div>



            <div className="col ">

                <h2>Transaction <i class="material-icons">filter_alt</i></h2>
                <div className='row'>
                    <div className="col-sm-11">
                        <input type="text" className='form-control' name='transactionid' id='transactionid' onChange={(event) => setTransactionId(event.target.value)} placeholder='Search by transaction Id' value={transactionid} />
                        {formErrors.TransactionIdError && <div style={{ color: "red" }}>{formErrors.TransactionIdError}</div>}
                    </div>

                    <button onClick={handleSubmit} className="button button1 col-sm" >
                        <i class="material-icons">
                            search
                        </i>
                    </button>
                </div>
                <hr />
                <br />



                <table>

                    {accounts.map(p => <tr key={p.accountId}>
                        <td>
                            <i class="material-icons">
                                Account Id:
                            </i>
                        </td>


                        <td> {p.accountId}</td>
                        <td><Link to={`/customer/all/transaction/account/${p.accountId}`}>Transaction Details</Link></td>
                    </tr>)}
                </table>


            </div>


        </div>


    </div>
    )
}
export default ReportTransaction;