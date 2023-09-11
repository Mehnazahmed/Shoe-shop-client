import { useEffect, useState } from "react";
import { FaArrowRight, FaTrash } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import useCart from "../hooks/UseCart";
import useProductData from "../hooks/useProductData";
import ProductCard from "./ProductCard";
import "./Shop.css";

const Shop = () => {
  const [, refetch] = useProductData();
  const [products, setProducts] = useState([]);

  const [cart, cartRefetch] = useCart();
  const { totalProducts } = useLoaderData();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState();
  //load data for pagination
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`
      );

      const data = await response.json();
      setProducts(data);
    }
    fetchData();
  }, [currentPage, itemsPerPage]);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  // const pageNumbers =[]
  // for(let i=0;i<=totalPages;i++){
  //     pageNumbers.push(i)
  // }

  const pageNumbers = [...Array(totalPages).keys()];

  let totalPrice = 0;
  let totalShipping = 0;
  let quantity = 0;
  for (const item of cart) {
    totalPrice = totalPrice + item.price;
    totalShipping = totalShipping + item.shipping;
    quantity = quantity + item.quantity;
  }
  const tax = (totalPrice * 7) / 100;
  const grandTotal = totalPrice + totalShipping + tax;

  const options = [5, 10, 20];
  const handleSelectChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  };
  return (
    <div>
      <div className="flex grid-cols-2 justify-center">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center p-20 relative">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              refetch={refetch}
              cartRefetch={cartRefetch}
            ></ProductCard>
          ))}
        </div>
        <div className="bg-[#ffe0b3] w-1/6 lg:block  hidden ms-14 ">
          {/* <CartInfo refetch={refetch}></CartInfo> */}
          <div className="ms-4 mt-14">
            <h4 className="text-xl font-bold">Order Summary</h4>
            <p className="mt-6">Selected Items: {cart.length}</p>
            <p className="mt-2">Total Price: ${totalPrice} </p>
            <p className="mt-2">Shipping:${totalShipping} </p>
            <p className="mt-2">Tax: ${tax}</p>
            <h6 className="mt-2 text-lg ">
              Grand Total: ${grandTotal.toFixed(2)}{" "}
            </h6>

            <button className="btn btn-sm bg-[#FF3030] rounded-none w-[180px] mt-4">
              <span>Clear Cart</span> <FaTrash></FaTrash>
            </button>
            <Link to="/viewcart">
              <button className="btn btn-sm bg-[#FF9900] rounded-none w-[180px] mt-4">
                <span>Review Cart</span> <FaArrowRight></FaArrowRight>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="pagination flex justify-center mb-4 ">
        {pageNumbers.map((number) => (
          <button
            className={`btn m-1 btn-sm  border-slate-400 ${
              currentPage === number ? "selected" : ""
            }`}
            key={number}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}
        <select value={itemsPerPage} onChange={handleSelectChange}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Shop;
