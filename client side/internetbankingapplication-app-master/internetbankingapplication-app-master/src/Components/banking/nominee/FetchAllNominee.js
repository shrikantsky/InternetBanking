import React, { useEffect, useState } from "react";

import axios from "axios";

import { Link } from "react-router-dom";
function FetchAllNominee() {
    const [nominee, setNominee] = useState([]);
    useEffect(() => {

        axios.get("http://localhost:8080/nominee/all/1").then(resp => setNominee(resp.data))

    }, []);
    return (

        <div className="container">

            {

                nominee.length > 0 &&

                <table className="table">

                    <thead className="thead-dark">

                        <tr>

                            <th>NomineeId</th>

                            <th>Name</th>

                            <th>govtId</th>
                            <th>govtIdType</th>

                            <th>phoneNo</th>
                            <th>AccountId</th>
                            <th>Relation</th>
                            <th></th>
                            <th></th>
                            <th></th>

                        </tr>

                    </thead>
                    <tbody>

{

    nominee.map(p => <tr key={p.nomineeId}>

        <td>{p.nomineeId}</td>
         <td>{p.name}</td>
        <td>{p.govtId}</td>
        <td>{p.govtIdType}</td>
        <td>{p.phoneNo}</td>
        <td>{p.account.accountId}</td>
        <td>{p.relation}</td>
        


        <td ><Link to={`/banking/fetchnominee/${p.nomineeId}`} className="btn btn-info" >view  </Link></td>
        <td ><Link to={`/banking/updatenominee/${p.nomineeId}`}className="btn btn-primary">  update </Link></td>  
         
        <td ><Link to={`/banking/deletenominee/${p.nomineeId}`}className="btn btn-danger">  Delete </Link></td>   
     
    </tr>)

}

</tbody>

</table>



}



</div>

)

}

export default FetchAllNominee;