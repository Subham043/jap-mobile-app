import React, { createContext, useContext, useEffect, useState } from "react";
import { ChildrenType, Wishlist as WishlistAPIType } from "../helper/types";
import { axiosPublic } from "../../axios";
import { api_routes } from "../helper/routes";
import { AuthContext } from "./AuthProvider";
import useSWR, { useSWRConfig } from 'swr'

const fetcher = (url: string) => axiosPublic.get(url).then((res) => res.data.wishlist);

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
    const { data:wishlist, isLoading:wishlistLoading, mutate:mutateWishlistData } = useSWR<WishlistAPIType>(auth.authenticated ? api_routes.wishlist : null, fetcher);
    const { mutate } = useSWRConfig()

    const fetchWishlist = async () => {await mutate(api_routes.wishlist)}

    const updateWishlistData = async (data: WishlistAPIType) => {
      if(auth.authenticated){
        await mutateWishlistData(data);
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
      }
    }
  
    return (
      <WishlistContext2.Provider value={{wishlist, wishlistLoading, updateWishlist, updateWishlistData, fetchWishlist, removeWishlistItem}}>
          {children}
      </WishlistContext2.Provider>
    );
}

export default WishlistProvider2;
