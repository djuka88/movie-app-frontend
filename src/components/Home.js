import useAuth from "./hooks/useAuth";
import Navbar from "./Navbar";

function Home(){

    const { user, logout } = useAuth()

    return(
        <div className="App">
            {user &&
            <>
                <Navbar>
                    <a href="#" onClick={logout} style={{ float:"right" , marginRight:"10px"}}>Logout</a>
                </Navbar>
                <h1>Welcome {user.name} !</h1>
            </>
            }
        </div>
    );
}

export default Home;