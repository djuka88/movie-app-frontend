import { useForm } from "react-hook-form";
import useAuth from "./hooks/useAuth";
import { Link } from "react-router-dom";

function Register(){

    const { register : registerMethod, registerError } = useAuth()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    return (
          <div className="App">
            <div style={{display:"block", background: "lightgray", overflow: "hidden"}}>
              <Link to="/login" style={{ float:"right" , marginRight:"10px"}}>Login</Link>
            </div>
            <h1>Movie-app register</h1>
            <form onSubmit={handleSubmit(registerMethod)}>
                <input type="text" name="firstName" placeholder="First name..." {...register("firstName")} ></input><br></br><br></br>
                <input type="text" name="email" placeholder="email..." {...register("email")} ></input><br></br><br></br>
                <input type="text" name="password" placeholder="Password..." {...register("password")} ></input><br></br><br></br>
                <input type="text" name="confirmPassword" placeholder="Confirm password" {...register("confirmPassword")} ></input><br></br><br></br>
            
                <input type="submit" />
            </form>
          </div>
      );
}

export default Register;


