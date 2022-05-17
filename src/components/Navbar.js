function Navbar({children}){

    return(
        <div style={{display:"block", background: "lightgray", overflow: "hidden"}}>
            {children}
        </div>
    );
}

export default Navbar;