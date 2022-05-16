import { useForm } from "react-hook-form";
import useAuth from "./hooks/useAuth";
import { Link } from "react-router-dom";

function Login(){

    const { login, loginError } = useAuth();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    //const dispatch = useDispatch();

    const onSubmit = data => {
        // authService.login(data);
        // dispatch(setCurrentUser(authService.getCurrentUser()));
        // navigate("/home");
    }

    return(
        <div className="App">
            <div style={{display:"block", background: "lightgray", overflow: "hidden"}}>
                <Link to="/register" style={{ float:"right" , marginRight:"10px"}}>Register</Link>
            </div>
            <h1>Movie-app login</h1>
            <form onSubmit={handleSubmit(login)}>
                <input type="text" name="email" placeholder="email..."  {...register("email")}></input><br></br><br></br>
                <input type="password" name="password" placeholder="Password..." {...register("password")}></input><br></br><br></br>

                <input type="submit" />
            </form>
        </div>
    );
}

export default Login;