import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaArrowRight, FaTrash } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const CartInfo = () => {
    const { user,loading } = useAuth();
    const [axiosSecure]= useAxiosSecure();
    
  
    
    const { refetch, data: cart = [] } = useQuery({
      queryKey: ["carts", user?.email],
      enabled: !loading,
     
      
      // queryFn: async () => {
      //     const res = await fetch(`http://localhost:5000/carts?email=${user?.email}`,{
      //         headers:{
      //             authorization:`bearer ${token}`
      //         }
      //     })
  
      //     return res.json()
      // },
      queryFn: async () => {
        const res = await axiosSecure(`/carts?email=${user?.email}`);
         console.log("res from axios", res);
        return res.data;
      },
    });
    return (
        <div className='ms-4 mt-14'>
           <h4 className='text-xl font-bold'>Order Summary</h4>
            <p className='mt-6'>Selected Items: {cart.length}</p>
            <p className='mt-2'>Total Price: </p>
            <p className='mt-2'>Shipping: </p>
            <p className='mt-2'>Tax:</p>
            <h6 className='mt-2 text-lg '>Grand Total: </h6>
            
            <button className='btn btn-sm bg-[#FF3030] rounded-none w-[180px] mt-4'>
                <span>Clear Cart 
               </span> <FaTrash></FaTrash>
            </button>
            <button className='btn btn-sm bg-[#FF9900] rounded-none w-[180px] mt-4'>
                <span>Review Cart 
               </span> <FaArrowRight></FaArrowRight>
            </button>

           </div>
    );
};

export default CartInfo;