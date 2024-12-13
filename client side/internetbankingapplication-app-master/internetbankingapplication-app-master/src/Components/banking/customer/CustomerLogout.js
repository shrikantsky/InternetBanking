import React from "react";
import { useNavigate} from "react-router-dom";

function CustomerLogout(){

    const navigate = useNavigate();

    const logout = () =>{
        const user =localStorage.getItem("loginuser");

        if(user!==null){
            localStorage.removeItem("loginuser");
            navigate("/")
        }
    }

    return(
        <div>
            <button onClick={logout} className="btn btn-danger">Logout</button>
        </div>
    )
}

export default CustomerLogout;