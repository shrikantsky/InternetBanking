import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';


function FetchAlltransactionsByAccountId() {

    const [transactions, setTransactions] = useState([]);
    const { id } = useParams();
    const [message, setMessage] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/transaction/all/" + id).then(resp => setTransactions(resp.data)).catch(error=>{setMessage(error.response.data)});
    }, [id]);

    return (
        <div className="container">


            <br />
            <h3>   All Transactios Of AccountID: {id}</h3>
            <br/>
 {message &&<h3 style={{color:'red'}}>{message}</h3>}
 <br/>
            <Link to={'/admin/transaction'} className="btn btn-primary">Back</Link>
            <br />

            {

                transactions.length > 0 &&

                <table className='table'>

                    <thead className='thead-dark'>

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
        </div>)
}

export default FetchAlltransactionsByAccountId;