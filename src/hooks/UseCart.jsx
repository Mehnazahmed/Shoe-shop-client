import { useQuery } from "@tanstack/react-query";


import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
const useCart = () => {
  const { user,loading } = useAuth();
  const [axiosSecure]= useAxiosSecure();

  
  const { refetch:cartRefetch, data: cart = [] } = useQuery({
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

  return [cart, cartRefetch ];
};
export default useCart;
