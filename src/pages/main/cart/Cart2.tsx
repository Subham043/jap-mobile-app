import {
    IonButton,
    IonRow,
    IonCol,
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItemDivider,
    IonIcon,
    IonCard,
    IonRefresher,
    RefresherEventDetail,
    IonRefresherContent,
    IonItem,
    IonLabel,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useState } from "react";
import EmptyCart from "../../../components/EmptyCart";
import { newspaperOutline } from "ionicons/icons";
import { AuthContext } from "../../../context/AuthProvider";
import LoadingPricingTable from "../../../components/LoadingPricingTable";
import { useCart } from "../../../context/CartProvider2";
import { useToast } from "../../../hooks/useToast";
import CheckoutModal from "../../../components/CheckoutModal";
import CartItem2 from "../../../components/CartItem/CartItem2";
import CouponCode2 from "../../../components/CouponCode/CouponCode2";
import { Browser } from "@capacitor/browser";


const legal_pages = [
    {
        name: 'Shipping Policy',
        link: 'https://jap.bio/shipping-policy'
    },
    {
        name: 'Return & Refund Policy',
        link: 'https://jap.bio/return-refund'
    },
    {
        name: 'Terms & Conditions',
        link: 'https://jap.bio/terms-conditions'
    },
];

  const couponSchema = yup
  .object({
    coupon_code: yup.string().required(),
  })
  .required();

const Cart2: React.FC = () => {
    const {cart, cartLoading, removeCartItem, incrementProductQuantity, decrementProductQuantity, fetchCart} = useCart();
    const {toastSuccess} = useToast();
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {auth} = useContext(AuthContext);

    const couponForm = useForm({
      resolver: yupResolver(couponSchema),
    });

    const removeCartHandler = async(product_id:number) => {  
        try{
          setLoading(true)
          await removeCartItem(product_id);
          toastSuccess('Item removed from cart')
        }finally{
          setLoading(false)
        }
    }

    const loadPage = async(url:string) =>{
        await Browser.open({ url });
    }

    return (
        <IonPage>
            <IonHeader translucent={true} className='main-header-background'>
                <IonToolbar className='main-header-background'> 
                    <IonTitle className="text-center">Cart</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen={false} forceOverscroll={false}>
                <IonRefresher slot="fixed" onIonRefresh={(event: CustomEvent<RefresherEventDetail>)=>{
                    auth.authenticated && fetchCart();
                    event.detail.complete();
                }}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                {auth.authenticated ? 
                cartLoading ? <>
                    <LoadingPricingTable />
                    <LoadingPricingTable />
                </>:
                (cart && cart.products.length>0) ? <>
                
                  <div className="page-padding mt-1 mb-1">
                        <div className="product-detail-main-specification">
                            <div className="product-detail-main-content-heading">
                                <h6>Cart Item</h6>
                            </div>
                            <div>
                                {
                                    cart.products.map((item, i) => <CartItem2 {...item} deleteHandler={removeCartHandler} incrementProductQuantity={incrementProductQuantity} decrementProductQuantity={decrementProductQuantity} loading={loading} key={i} />)
                                }
                            </div>
                        </div>
                        <div className="product-detail-main-specification">
                            <div className="product-detail-main-content-heading">
                                <h6>Coupon</h6>
                            </div>
                            <CouponCode2 couponForm={couponForm} />
                        </div>
                        <div className="product-detail-main-specification">
                            <div className="product-detail-main-content-heading">
                                <h6>Pricing Information</h6>
                            </div>
                            <div className="cart-pricing-main-table">
                                <table className="w-100">
                                    <thead className="w-100">
                                        <tr className="w-100">
                                            <td className="text-left tr-price">Total Items:</td>
                                            <td className="text-right tr-price">{cart.total_items}</td>
                                        </tr>
                                        <tr className="w-100">
                                            <td className="text-left tr-price">Sub Total:</td>
                                            <td className="text-right tr-price">&#8377; {cart.sub_total}</td>
                                        </tr>
                                        <tr className="w-100">
                                            <td className="text-left tr-price">Total Discount:</td>
                                            <td className="text-right tr-price">- &#8377; {cart.total_discount}</td>
                                        </tr>
                                        <tr className="w-100">
                                            <td className="text-left tr-price">GST:</td>
                                            <td className="text-right tr-price">+ &#8377; {cart.gst_charge}</td>
                                        </tr>
                                        <tr className="w-100">
                                            <td className="text-left tr-price">Delivery Charge:</td>
                                            <td className="text-right tr-price">+ &#8377; {cart.delivery_charge}</td>
                                        </tr>
                                        <tr className="w-100">
                                            <td className="text-left tr-price font-bold">Cumulative Total:</td>
                                            <td className="text-right tr-price font-bold">&#8377; {(cart.total_price_with_gst_delivery_charge).toFixed(2)}</td>
                                        </tr>
                                        <tr className="w-100">
                                            <td className="text-left tr-price">Coupon Discount:</td>
                                            <td className="text-right tr-price">- &#8377; {cart.coupon_discount}</td>
                                        </tr>
                                        <tr className="border-bottom-1 w-100 total-bg-table-tr">
                                            <td className="text-left tr-price font-bold">Total:</td>
                                            <td className="text-right tr-price font-bold">&#8377; {cart.total_price_with_coupon_dicount}</td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div className="mb-2">
                            <div className="cart-policy-container">
                                {
                                    legal_pages.map((item, i) => <IonItem className="cart-policy-item" lines="full" detail={true} onClick={()=>loadPage(item.link)} key={i}>
                                        <IonLabel>{item.name}</IonLabel>
                                        <IonIcon icon={newspaperOutline} slot="start"></IonIcon>
                                    </IonItem>)
                                }
                            </div>    
                        </div>
                  </div>

                  

                  <IonItemDivider className="cart-checkout-btn-main-container page-padding" slot="fixed">
                      <IonRow className="ion-align-items-center ion-justify-content-center p-0 w-100">
                          <IonCol
                              size="12"
                              className='text-right'
                          >
                              <IonButton className="pagination-btn m-0" fill='solid' color="success" onClick={()=>setIsOpen(true)}>
                                <IonRow className="ion-align-items-center ion-justify-content-center p-0 w-100">
                                    <IonCol
                                        size="6"
                                        className='text-left'
                                    >
                                        <div>
                                            {cart.total_items} Items | &#8377; {cart.total_price_with_coupon_dicount}
                                        </div>
                                    </IonCol>
                                    <IonCol
                                        size="6"
                                        className='text-right'
                                    >
                                        <div>
                                            Checkout
                                        </div>
                                    </IonCol>
                                </IonRow>
                                    
                              </IonButton>
                          </IonCol>
                      </IonRow>
                  </IonItemDivider>
                  <div className="fixed-spacing-2"></div>

                  <CheckoutModal isOpen={isOpen} setIsOpen={setIsOpen} couponForm={couponForm} />

                </> : <EmptyCart type="cart" /> : <EmptyCart type="cart" />}

            </IonContent>
        </IonPage>
    );
};

export default Cart2;
