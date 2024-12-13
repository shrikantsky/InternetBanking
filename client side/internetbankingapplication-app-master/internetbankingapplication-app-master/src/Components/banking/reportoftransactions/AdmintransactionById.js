import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
function AdmintransactionById() {
    const [transactionId, setTransactionId] = useState(null);
    const [formErrors, setFormErrors] = useState('');
    
    const navigate = useNavigate();
const handleSubmit=()=>{
    let errors={};
    if (!transactionId) { errors['transactionIdError'] = "Transaction Id Required" };

    
    setFormErrors(errors);
    const noErrors = Object.keys(errors).length === 0;
    if (noErrors) {
         navigate(`/admin/transaction/details/${transactionId}`);
    }

}

    return (


        <div className="container">
            <br></br>
            <h1>Admin Panel</h1>
            <h3>Transaction By Transaction-Id</h3>

            <div className='form-group'>
                <label htmlFor='transactionId'>Enter Transaction-Id</label>
                <input type="text" placeholder="Transaction Id....." className='form-control' name="transactionId" id="transactionId" onChange={(event) => setTransactionId(event.target.value)} value={transactionId} required/>
                {formErrors.transactionIdError && <div style={{ color: "red" }}>{formErrors.transactionIdError}</div>}
            </div> 

            <div className='form-group'>
                <button  onClick={handleSubmit} className="btn btn-primary">Submit</button>

                <Link  to='/admin/transaction' className="btn btn-secondary">Back</Link>
            </div></div>)


}
export default AdmintransactionById;