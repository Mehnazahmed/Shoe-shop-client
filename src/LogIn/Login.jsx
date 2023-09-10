import React from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";


const Login = () => {
  const {signIn}=useAuth()
    const {
        register,
        handleSubmit,
        watch,
        getValues,
        reset,
        formState: { errors },
      } = useForm();
      const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
      const onSubmit =data =>{
      signIn(data.email,data.password)
      .then(result=>{
        const user =result.user;
        console.log(user)
        Swal.fire({
          title: 'User Login Successful.',
          showClass: {
              popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
          }
      });
      navigate(from, { replace: true });
      })
        reset()
      }
  return (
    <div className="w-[460px]  border-2   p-10 mx-auto  my-20">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
     <form onSubmit={handleSubmit(onSubmit)} className="flex-col   ">
     <div className="form-control ">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="email"
          className="input input-bordered"
          {...register("email", { required: true })}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="password"
          className="input input-bordered"
          {...register("password", { required: true })}
        />
        <label className="label">
          <a href="#" className="label-text-alt link link-hover">
            Forgot password?
          </a>
        </label>
      </div>
      <div className=" mt-6">
        <button className="btn  bg-[#ffe0b3] hover:bg-[#db9120] w-full">Login</button>
      </div>
      <p className="text-center"><small>New Here? <Link to='/signup' className="text-[#FF9900]">Create an account</Link> </small></p>
      <div className="divider">OR</div>
      <div><button className="btn w-full"><FaGoogle ></FaGoogle><span>Continue with Google</span></button></div>
     </form>
    </div>
  );
};

export default Login;
