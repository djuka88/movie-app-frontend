import { useForm } from "react-hook-form";
import authService from "../services/api/AuthService";

function Register(){

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        authService.register(data);
    }

    return (
        <div className="App">
          <h1>Movie-app register</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
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