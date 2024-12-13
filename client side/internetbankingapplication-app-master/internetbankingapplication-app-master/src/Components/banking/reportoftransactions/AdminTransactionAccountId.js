import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';


function AdminTransactionAccountId() {
    const [accountId, setAccountId] = useState(null);
    const [formErrors, setFormErrors] = useState('');
    
    const navigate = useNavigate();
const handleSubmit=()=>{
    let errors={};
    if (!accountId) { errors['accountIdError'] = "Account Id Required" };

    
    setFormErrors(errors);
    const noErrors = Object.keys(errors).length === 0;
    if (noErrors) {
         navigate(`/admin/transaction/account/${accountId}`);
    }

}

    
   
    return (


        <div className="container">
            <br/>
             <h1>Admin Panel</h1>
              <h3 >Transaction By AccountID</h3>

            <div className='form-group'>
                <label htmlFor='accountId'>Enter accountId-Id</label>
                <input type="text" className='form-control' name="accountId" placeholder="Enter Account Id ........." id="accountId" onChange={(event) => setAccountId(event.target.value)} value={accountId} />
                {formErrors.accountIdError && <div style={{ color: "red" }}>{formErrors.accountIdError}</div>}
                
            </div>

            <div className='form-group'>
  
              <button  onClick={handleSubmit} className="btn btn-primary">Submit</button>
                <Link  to='/admin/transaction' className="btn btn-secondary">Back</Link>            </div></div>)

}
export default AdminTransactionAccountId;