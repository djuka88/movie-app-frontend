import { useForm } from "react-hook-form";
import authService from "../services/api/AuthService";
import Navbar from "./Navbar";

function Login(){

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        authService.login(data);
    }

    return(
        <div className="App">
            <Navbar></Navbar>
            <h1>Movie-app login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" name="email" placeholder="email..."  {...register("email")}></input><br></br><br></br>
                <input type="password" name="password" placeholder="Password..." {...register("password")}></input><br></br><br></br>

                <input type="submit" />
            </form>
        </div>
    );
}

export default Login;