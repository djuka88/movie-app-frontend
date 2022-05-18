import { useForm } from "react-hook-form";
import useAuth from "./hooks/useAuth";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Navbar from "./Navbar";

function Register() {
  const schema = yup.object({
    firstName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords does not match"),
  });

  const { register: registerMethod, registerError } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="App">
      <h1>Movie-app register</h1>
      <form>
        <input
          type="text"
          name="firstName"
          placeholder="First name..."
          {...register("firstName")}
        />
        <p>{errors.firstName?.message}</p>
        <input
          type="text"
          name="email"
          placeholder="email..."
          {...register("email")}
        />
        <p>{errors.email?.message}</p>
        <input
          type="password"
          name="password"
          placeholder="Password..."
          {...register("password")}
        />
        <p>{errors.password?.message}</p>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          {...register("confirmPassword")}
        />
        <p>{errors.confirmPassword?.message}</p>

        <input type="submit" onClick={handleSubmit(registerMethod)}/>
      </form>
    </div>
  );
}

export default Register;
