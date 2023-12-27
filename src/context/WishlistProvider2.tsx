import React, { createContext, useCallback, useContext } from "react";
import { ChildrenType, Wishlist as WishlistAPIType } from "../helper/types";
import { axiosPublic } from "../../axios";
import { api_routes } from "../helper/routes";
import { AuthContext } from "./AuthProvider";
import useSWR, { useSWRConfig } from 'swr'
import { useLogin } from "./LoginProvider";
import { useToast } from "../hooks/useToast";

type WishlistUpdateDataType = number[]|[]

type WishlistContextType = {
  wishlist: WishlistAPIType | undefined;
  wishlistLoading: boolean;
  updateWishlist: (data: WishlistUpdateDataType) => Promise<void>;
  fetchWishlist: () => Promise<void>;
  updateWishlistData: (data: WishlistAPIType) => Promise<void>;
  removeWishlistItem: (product_id: number) => Promise<void>;
}

const wishlistDefaultValues: WishlistContextType = {
  wishlist: undefined,
  wishlistLoading: false,
  updateWishlist: async (data: WishlistUpdateDataType) => {},
  fetchWishlist: async () => {},
  updateWishlistData: async (data: WishlistAPIType) => {},
  removeWishlistItem: async (product_id: number) => {},
};

export const WishlistContext2 = createContext<WishlistContextType>(wishlistDefaultValues);

export const useWishlist = () => useContext(WishlistContext2);


const WishlistProvider2: React.FC<ChildrenType> = ({children}) => {
    const {auth} = useContext(AuthContext);
    const fetcher = useCallback(
      async (url: string) => {
        if(auth.authenticated){
          const headers = {
            headers: {
              "Authorization" : `Bearer ${auth.token}`,
              "Accept": 'application/json'
            }
          }
          const res =  await axiosPublic.get(url,headers)
          return res.data.wishlist;
        }
        return undefined;
      },
      [auth],
    );
    const { data:wishlist, isLoading:wishlistLoading, mutate:mutateWishlistData } = useSWR<WishlistAPIType>(auth.authenticated ? api_routes.wishlist : null, fetcher);
    const { mutate } = useSWRConfig()
    const {toastError} = useToast();
    const {toggleLoginModal} = useLogin();

    const fetchWishlist = async () => {await mutate(api_routes.wishlist)}

    const updateWishlistData = async (data: WishlistAPIType) => {
      if(auth.authenticated){
        await mutateWishlistData(data);
      }else{
        toastError('Please login to add product to wishlist');
        toggleLoginModal()
      }
    }
    
    const updateWishlist = async (data: WishlistUpdateDataType) => {
      if(auth.authenticated){
        try {
          const response = await axiosPublic.post(api_routes.wishlist, data.length>0 ? {product:data}: {}, {
            headers: {"Authorization" : `Bearer ${auth.token}`}
          });
          await mutateWishlistData(response.data.wishlist);
        } catch (error: any) {
          console.log(error);
        }
      }else{
        toastError('Please login to add product to wishlist');
        toggleLoginModal()
      }
    }

    const removeWishlistItem = async(product_id: number) => {
      if(auth.authenticated && wishlist){
        const wishlist_main = wishlist.products.map(item => item.id)
        const products_item_index = wishlist_main.findIndex(item => item===product_id)
        if(products_item_index>-1){
          const wishlist_item_removed = wishlist_main.filter(item => item!==product_id)
          await updateWishlist([...wishlist_item_removed.map(item => item)])
        }
      }else{
        toastError('Please login to remove product from wishlist');
        toggleLoginModal()
      }
    }
  
    return (
      <WishlistContext2.Provider value={{wishlist, wishlistLoading, updateWishlist, updateWishlistData, fetchWishlist, removeWishlistItem}}>
          {children}
      </WishlistContext2.Provider>
    );
}

export default WishlistProvider2;
