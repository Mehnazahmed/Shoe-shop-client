import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const {user, logOut} =useAuth();
  const handleLogOut =()=>{
    logOut()
    .then(()=>{})
    .catch((err)=> console.log(err))
  }
  const navItems = (
    <>
      <li>
        <Link to="/shop">Shop</Link>
      </li>
      <li>
        <a>Order Review</a>
      </li>
      <li>
        <a>Inventory</a>
      </li>
      {
        user? 
         <li>
        <button onClick={handleLogOut} className="btn btn-ghost text-inherit lowercase">LogOut</button>
      </li>:
      <li>
      <Link to="/login">Log in</Link>
    </li> 
      }
    </>
  );
  return (
    <div className="navbar bg-[#1C2B35] text-white px-10 ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52 "
          >
            {navItems}
          </ul>
        </div>
        <a
          href="/"
          className="btn btn-ghost normal-case text-xl hover:text-3xl"
        >
          Lit-Shoes
        </a>
      </div>
      <div className="navbar-end hidden lg:flex ">
        <ul className="menu menu-horizontal px-1  hover:text-cyan-300">
          {navItems}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
