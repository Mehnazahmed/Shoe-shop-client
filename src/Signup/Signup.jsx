import axios from "axios";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const Signup = () => {
  const {createUser,updateUser} =useAuth();
    const {
        register,
        handleSubmit,
        watch,
        getValues,
        reset,
        formState: { errors },
      } = useForm();
      const navigate =useNavigate();
      const onSubmit =data =>{
        createUser(data.email, data.password)
        .then(result=>{
          const user=result.user;
          console.log(user)
          updateUser(data.name)
          .then(()=>{
            const saveUser = { name: data.name, email: data.email }
          axios.post('http://localhost:5000/users',saveUser)
          .then(data=>{
            console.log(data.data)
            if(data.data.insertedId){
              reset();
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'User created successfully.',
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/shop')
            }
          })
          })
          .catch(err=>console.log(err))
        })
        

       
      }
      
    return (
        <div className="w-[460px]  border-2   p-10 mx-auto  my-20">
        <h2 className="text-3xl font-bold text-center mb-6">Signup</h2>
     <form onSubmit={handleSubmit(onSubmit)} className="flex-col   ">
     <div className="form-control ">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="name"
          placeholder="name"
          className="input input-bordered"
          {...register("name", { required: true })}
        />
        {errors.email && <span className="text-red-500">This field is required</span>}
      </div>
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
        {errors.email && <span className="text-red-500">This field is required</span>}
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
        {errors.password && <span className="text-red-500">This field is required</span>}
       
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Confirm Password</span>
        </label>
        <input
          type="password"
          placeholder="password"
          className="input input-bordered"
          {...register("confirmPassword", { 
            required: true,
            validate: (value) => value === watch("password") || "Passwords do not match"
          })}
        />
        {errors.confirmPassword && <span className="text-red-500">Passwords do not match</span>}
       
      </div>
      <div className=" mt-6">
        <button className="btn  bg-[#ffe0b3] hover:bg-[#db9120] w-full">Signup</button>
      </div>
      <p className="text-center"><small>Already Have An Account? <Link to='/login' className="text-[#FF9900]">Login</Link> </small></p>
      <div className="divider">OR</div>
      <div><button className="btn w-full"><FaGoogle ></FaGoogle><span>Continue with Google</span></button></div>
     </form>
    </div>
    );
};

export default Signup;