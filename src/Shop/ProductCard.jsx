import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import './ProductCard.css';

const ProductCard = ({product,refetch,cartRefetch}) => {
  
  const {_id,name,category,seller,price,img,stock,shipping}=product;
  const {user}=useAuth();
  
  const navigate=useNavigate();
  const location =useLocation();
  const handleAddToCart = product=>{
    console.log(product)
    if(user && user.email){
      const cartItem ={name,img,price,category,seller,stock,email:user.email,shipping}
      axios.post('http://localhost:5000/carts',cartItem)
      .then(data=>{
        console.log(data.data)
        if(data.data.insertedId){
         refetch()
         cartRefetch()
         Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Added Successfully',
          showConfirmButton: false,
          timer: 1500
        })
        }
      })
    }
    else{
      Swal.fire({
        title: 'Please login to order food',
        
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Log in!'
      }).then((result) => {
        if (result.isConfirmed) {
         navigate('/login',{state:{from:location}});
        }
      })
    }
  }
  return (
    <div className='product'>
            <img src={product.img} alt="" />
            <div className='product-info'>
                <h6 className='product-name'>{product.name}</h6>
                <p>Price: ${product.price}</p>
                <p>Manufacturer: {product.seller}</p>
                <p>Rating: {product.ratings} Stars</p>
            </div>
            <button onClick={()=>handleAddToCart(product)}  className='btn-cart'>
               <span> Add to Cart</span>
               <FaShoppingCart className="ms-[190px] mt-[-20px]"></FaShoppingCart>
                </button>
        </div>
  );
};

export default ProductCard;
