import {
    IonPage,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    RefresherEventDetail,
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
    const {wishlist, wishlistLoading, removeWishlistItem, fetchWishlist} = useWishlist();
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
                <IonRefresher slot="fixed" onIonRefresh={(event: CustomEvent<RefresherEventDetail>)=>{
                    fetchWishlist();
                    event.detail.complete();
                }}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                {wishlistLoading ? <>
                    <LoadingPricingTable />
                    <LoadingPricingTable />
                </>: (wishlist && wishlist.products.length>0) ? <>
                
                <div className="page-padding mt-1 mb-1">
                    <div>
                        {
                            wishlist.products.map((item, i) => <WishlistItem {...item} deleteHandler={removeWishlistHandler} loading={loading} key={i} />)
                        }
                    </div>
                </div>


            </> : <EmptyCart type="wishlist" />}

            </IonContent>
        </IonPage>
    );
};

export default Wishlist;
