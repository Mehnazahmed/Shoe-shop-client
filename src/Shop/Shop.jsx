
import { FaArrowRight, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useCart from '../hooks/UseCart';
import useProductData from '../hooks/useProductData';
import ProductCard from './ProductCard';

const Shop = () => {
    const [products,refetch] =useProductData();
    const [cart,cartRefetch] =useCart();
    console.log(cart)
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
    return (
        <div className='flex grid-cols-2 justify-center'>
           
           <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center p-20 relative'>
            {
                products.map(product=><ProductCard
                key={product._id}
                product={product}
                refetch={refetch}
                cartRefetch={cartRefetch}
                ></ProductCard>)
            }
           </div>
           <div className='bg-[#ffe0b3] w-1/6 lg:block  hidden ms-14 '>
            {/* <CartInfo refetch={refetch}></CartInfo> */}
           <div className='ms-4 mt-14'>
           <h4 className='text-xl font-bold'>Order Summary</h4>
            <p className='mt-6'>Selected Items: {cart.length}</p>
            <p className='mt-2'>Total Price: ${totalPrice} </p>
            <p className='mt-2'>Shipping:${totalShipping} </p>
            <p className='mt-2'>Tax: ${tax}</p>
            <h6 className='mt-2 text-lg '>Grand Total: ${grandTotal.toFixed(2)} </h6>
            
            <button className='btn btn-sm bg-[#FF3030] rounded-none w-[180px] mt-4'>
                <span>Clear Cart 
               </span> <FaTrash></FaTrash>
            </button>
            <Link to='/viewcart'><button className='btn btn-sm bg-[#FF9900] rounded-none w-[180px] mt-4'>
                <span>Review Cart 
               </span> <FaArrowRight></FaArrowRight>
            </button></Link>

           </div> 
           </div>
        </div>
    );
};

export default Shop;