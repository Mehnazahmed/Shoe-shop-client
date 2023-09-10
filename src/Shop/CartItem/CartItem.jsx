import axios from "axios";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useCart from "../../hooks/UseCart";
import "./CartItem.css";

const CartItem = ({ item, cartRefetch }) => {
  const [cart] = useCart();
  const { img, name, price, shipping } = item;
  const handleRemoveFromCart = (item) => {
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
            axios.delete(`http://localhost:5000/carts/${item._id}`)
            .then(data=>{
                if(data.data.deletedCount>0){
                    cartRefetch();
                    Swal.fire('Deleted! Successfull')  
                }
            })
        }
        
      })
  };
  return (
    
      <div className="review-item ">
        <img src={img} alt="" />
        <div className="review-details">
          <p className="product-title">{name}</p>
          <p>
            Price: <span className="orange-text">${price}</span>
          </p>
          <p>
            Shipping Charge: <span className="orange-text">${shipping}</span>
          </p>
        </div>
        <button
          onClick={() => handleRemoveFromCart(item)}
          className="btn-delete"
        >
          <FaTrash className="delete-icon"></FaTrash>
        </button>
      </div>
     
   
  );
};

export default CartItem;
