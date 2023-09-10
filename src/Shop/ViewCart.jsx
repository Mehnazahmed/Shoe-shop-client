import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useCart from "../hooks/UseCart";
import CartItem from "./CartItem/CartItem";


const ViewCart = () => {
    const [cart,cartRefetch] =useCart();
    // const [cartItems,setCartItems] =useState(cart);
    let totalPrice =0;
    let totalShipping =0;
    let quantity =0;
    for (const item of cart){
        totalPrice = totalPrice + item.price ;
        totalShipping = totalShipping + item.shipping;
         quantity = quantity+item.quantity;
    }
    const tax = totalPrice * 7/100;
    const grandTotal = totalPrice+totalShipping +tax;

    const clearCart =()=>{
      Swal.fire({
        title: 'Are You Sure?',
        
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes Delete It'
      })
      .then(result=>{
        if(result.isConfirmed){
            axios.delete('http://localhost:5000/carts')
            .then(data=>{
                if(data.data.deletedCount>0){
                    cartRefetch();
                    Swal.fire('Deleted! Successfull')  
                }
            })
        }
        
      })

    }

    return (
        <div className="flex grid-cols-2 justify-evenly p-20">
            <div className="">
            {
              cart.length>0?  (cart.map(item=><CartItem
                key={item._id}
                item={item}
                cartRefetch={cartRefetch}
                ></CartItem>)): 
                <Link to='/shop'><button className="btn btn-accent grid justify-center align-middle">Please visit Our Shop</button></Link>
            }
            
        </div>
        <div className="bg-[#ffe0b3] w-1/4 lg:block  hidden ms-14 ">
        {/* <CartInfo refetch={refetch}></CartInfo> */}
        <div className="ms-10 mt-14">
          <h4 className="text-xl font-bold">Order Summary</h4>
          <p className="mt-6">Selected Items: {cart.length}</p>
          <p className="mt-2">Total Price: ${totalPrice}</p>
          <p className="mt-2">Shipping: ${totalShipping}</p>
          <p className="mt-2">Tax: ${tax}</p>
          <h6 className="mt-2 text-lg ">Grand Total: ${grandTotal} </h6>

        </div>
          <button onClick={clearCart} className="btn btn-sm bg-[#FF3030] rounded-none w-[280px] m-2 mt-6">
            <span>Clear Cart</span> <FaTrash></FaTrash>
          </button>
      </div>

        </div>
    );
};

export default ViewCart;