import { Link } from "react-router-dom";

function Navbar(){
    return(
        <div style={{display:"block", background: "lightgray", overflow: "hidden"}}>
            <Link to="/register" style={{ float:"right" , marginRight:"10px"}}>Register</Link>
        </div>
    );
}

export default Navbar;