import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function FetchAllTransactionByAccountIdDate() {
    const [transactions, setTransactions] = useState('');
    const [accountId, setAccountId] = useState('');
    const [fromDate, setfromDate] = useState('');
    const [toDate, settoDate] = useState('');
    const [formErrors, setFormErrors] = useState('');
    const [message, setMessage] = useState([]);

    const handelSubmit = () => {
        let errors={};
        if (!accountId) { errors['accountIdError'] = "Account Id Required" };
        if (!fromDate) { errors['fromDateError'] = " Date Required" };
      
        setFormErrors(errors);
        const noErrors = Object.keys(errors).length === 0;
        if (noErrors) {
        const payload = {
            accountId: accountId,
            fromDate: fromDate,
            toDate: toDate,

        }

        axios.post("http://localhost:8080/transaction/filterdate", payload).then(resp => setTransactions(resp.data)).catch(error=>{setMessage(error.response.data)});
        ;
    }
    }


    return (
        <div className='container'>
<br/>
<h1>Admin Panel</h1>
            <h3>Transaction Based On Date Of Transaction</h3>
<br/><br/>
 {message &&<h3 style={{color:'red'}}>{message}</h3>}
 <br/>
            <div className='form-group'>
                <label htmlFor='accountId'>Enter Account-Id To Veiw Details</label>
                <input type="text" className='form-control' name='accountId' id='accountId' placeholder='accounts-Id'
                    onChange={(event) => setAccountId(event.target.value)} value={accountId} />
                                {formErrors.accountIdError && <div style={{ color: "red" }}>{formErrors.accountIdError}</div>}

            </div>

            <div className='form-group'>
                <label htmlFor='fromDate'>Enter Date From</label>
                <input type="date" className='form-control' name='fromDate' id='fromDate' placeholder='date'
                    onChange={(event) => setfromDate(event.target.value)} value={fromDate} />
                      {formErrors.fromDateError && <div style={{ color: "red" }}>{formErrors.fromDateError}</div>}
            </div>

            <div className='form-group'>
                <label htmlFor='toDate'>Enter Date Till</label>
                <input type="date" className='form-control' name='toDate' id='toDate' placeholder='toDate-Id'
                    onChange={(event) => settoDate(event.target.value)} value={toDate} />
                      {formErrors.fromDateError && <div style={{ color: "red" }}>{formErrors.fromDateError}</div>}
            </div>

            <div>
                
                <Link onClick={handelSubmit} className="btn btn-primary">Veiw transaction</Link>
                              
                <Link  to='/admin/transaction' className="btn btn-secondary">Back</Link>   
                
            </div>



            <div>
                {
                 
                    transactions.length > 0 &&

                    <table className='table'>
                        <thead className='thead-dark'>
                            <caption>All Transactios on Date</caption>
                            <tr>
                                <th>Transaction Id</th>
                                <th>Amount</th>
                                <th>Transaction Type</th>
                                <th>Date Time</th>
                                <th>Transaction Status</th>
                                <th>transaction Remarks</th>
                             
                              </tr>
                        </thead>
                        <tbody>
                            {transactions.map(p => <tr key={p.transactionId}>
                                <td>{p.transactionId}</td>
                                <td>{p.amount}</td>
                                <td>{p.transactionType}</td>
                                <td>{p.dateTime}</td>
                                <td>{p.transactionStatus}</td>
                                <td>{p.transactionRemarks}</td>
                            
                            </tr>)
                            }
                        </tbody>
                    </table>
                
                  
                }
            </div>
        </div>
    )
}

export default FetchAllTransactionByAccountIdDate;