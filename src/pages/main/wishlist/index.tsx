import {
    IonPage,
    IonContent,
    IonCard,
} from "@ionic/react";
import { useState } from "react";
import EmptyCart from "../../../components/EmptyCart";
import WishlistItem from "../../../components/WishlistItem";
import BackHeader from "../../../components/BackHeader";
import LoadingPricingTable from "../../../components/LoadingPricingTable";
import { useWishlist } from "../../../context/WishlistProvider2";
import { useToast } from "../../../hooks/useToast";

const Wishlist: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const {wishlist, wishlistLoading, removeWishlistItem} = useWishlist();
    const {toastSuccess} = useToast();

    const removeWishlistHandler = async(product_id:number) => {  
        try{
          setLoading(true)
          await removeWishlistItem(product_id);
          toastSuccess('Item removed from cart')
        }finally{
          setLoading(false)
        }
    }
    


    return (
        <IonPage>
            <BackHeader title='Wishlist' link='/account' />
            <IonContent fullscreen={false} forceOverscroll={false} style={{'--background':'#f9f9f9'}}>
                {wishlistLoading ? <>
                    <LoadingPricingTable />
                    <LoadingPricingTable />
                </>: (wishlist && wishlist.products.length>0) ? <>
                
                <IonCard className="mt-2">
                    <div className='ion-padding pt-0 pb-2'>
                        <div className="content-main mt-1">
                            <h6>Wishlist Items</h6>
                        </div>
                    </div>
                    {
                        wishlist.products.map((item, i) => <WishlistItem {...item} deleteHandler={removeWishlistHandler} loading={loading} key={i} />)
                    }
                </IonCard>


            </> : <EmptyCart type="wishlist" />}

            </IonContent>
        </IonPage>
    );
};

export default Wishlist;
