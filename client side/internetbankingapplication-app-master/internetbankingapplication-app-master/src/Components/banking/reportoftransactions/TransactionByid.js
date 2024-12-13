import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';


function TransactionByid() {

    const [transaction, setTransaction] = useState(null);
    const { id } = useParams();
    const [message, setMessage] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/transaction/viewbyid/" + id).then(resp => setTransaction(resp.data)).catch(error => { setMessage(error.response.data) });
    }, [id]);

    return (
        <div className="container">
            <br />
            <h3>Transaction</h3>
            <Link to={'/admin/transaction'} className="btn btn-primary">Back</Link>
            <br />
            <br />
            {message && <h3 style={{ color: 'red' }}>{message}</h3>}
            <br />
            {
                transaction !== null &&

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
                        <tr>
                            <td>{transaction.transactionId}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.transactionType}</td>
                            <td>{transaction.dateTime}</td>
                            <td>{transaction.transactionStatus}</td>
                            <td>{transaction.transactionRemarks}</td>
                        </tr>

                    </tbody>
                </table>
            }
        </div>
    )
}

export default TransactionByid;