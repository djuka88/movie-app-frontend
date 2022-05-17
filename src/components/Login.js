import { useForm } from "react-hook-form";
import useAuth from "./hooks/useAuth";
import { Link } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Navbar from "./Navbar";

function Login(){

    const schema = yup.object({
        email: yup.string().email().required(),
        password: yup.string().min(8).required()
    })

    const { login, loginError } = useAuth();
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    return(
        <div className="App">
            <Navbar>
                <Link to="/register" style={{ float:"right" , marginRight:"10px"}}>Register</Link>
            </Navbar>
            <h1>Movie-app login</h1>
            <form onSubmit={handleSubmit(login)}>
                <input type="text" name="email" placeholder="email..."  {...register("email")}/>
                <p>{errors.email?.message}</p>
                <input type="password" name="password" placeholder="Password..." {...register("password")}/>
                <p>{errors.password?.message}</p>

                <input type="submit" />
            </form>
        </div>
    );
}

export default Login;