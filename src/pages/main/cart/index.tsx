import {
    IonButton,
    IonText,
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
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useState } from "react";
import EmptyCart from "../../../components/EmptyCart";
import { chevronForwardOutline } from "ionicons/icons";
import CartItem from "../../../components/CartItem";
import { AuthContext } from "../../../context/AuthProvider";
import LoadingPricingTable from "../../../components/LoadingPricingTable";
import { useCart } from "../../../context/CartProvider2";
import { useToast } from "../../../hooks/useToast";
import CouponCode from "../../../components/CouponCode";
import CheckoutModal from "../../../components/CheckoutModal";

  const couponSchema = yup
  .object({
    coupon_code: yup.string().required(),
  })
  .required();

const Cart: React.FC = () => {
    const {cart, cartLoading, removeCartItem, incrementProductQuantity, decrementProductQuantity} = useCart();
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

    return (
        <IonPage>
            <IonHeader translucent={true} className='main-header-background'>
                <IonToolbar className='main-header-background'> 
                    <IonTitle className="text-center">Cart</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen={false} forceOverscroll={false} style={{'--background':'#f9f9f9'}}>
                {auth.authenticated ? 
                cartLoading ? <>
                    <LoadingPricingTable />
                    <LoadingPricingTable />
                </>:
                (cart && cart.products.length>0) ? <>
                
                  <IonCard className=" mt-2 mb-2">
                      <div className='ion-padding pt-0 pb-2'>
                          <div className="content-main mt-1">
                              <h6>Cart Items</h6>
                          </div>
                      </div>
                      {
                          cart.products.map((item, i) => <CartItem {...item} deleteHandler={removeCartHandler} incrementProductQuantity={incrementProductQuantity} decrementProductQuantity={decrementProductQuantity} loading={loading} key={i} />)
                      }
                  </IonCard>

                  <CouponCode couponForm={couponForm} />
                  
                  <IonCard className="final-table mt-2 mb-2">
                      <div className='ion-padding pt-0 pb-2'>
                          <div className="content-main mt-1">
                              <h6>Pricing Information</h6>
                          </div>
                      </div>
                      <table className="w-100 border-final-1">
                          <thead className="w-100">
                              <tr className="border-bottom-1 w-100">
                                  <td className="text-left tr-price">Total Items:</td>
                                  <td className="text-right tr-price">{cart.total_items}</td>
                              </tr>
                              <tr className="border-bottom-1 w-100">
                                  <td className="text-left tr-price">Sub Total:</td>
                                  <td className="text-right tr-price">&#8377; {cart.sub_total}</td>
                              </tr>
                              <tr className="border-bottom-1 w-100">
                                  <td className="text-left tr-price">Total Discount:</td>
                                  <td className="text-right tr-price">- &#8377; {cart.total_discount}</td>
                              </tr>
                              <tr className="border-bottom-1 w-100">
                                  <td className="text-left tr-price">GST:</td>
                                  <td className="text-right tr-price">+ &#8377; {cart.gst_charge}</td>
                              </tr>
                              <tr className="border-bottom-1 w-100">
                                  <td className="text-left tr-price">Delivery Charge:</td>
                                  <td className="text-right tr-price">+ &#8377; {cart.delivery_charge}</td>
                              </tr>
                              <tr className="border-bottom-1 w-100">
                                  <td className="text-left tr-price font-bold">Cumulative Total:</td>
                                  <td className="text-right tr-price font-bold">&#8377; {(cart.total_price_with_gst_delivery_charge).toFixed(2)}</td>
                              </tr>
                              <tr className="border-bottom-1 w-100">
                                  <td className="text-left tr-price">Coupon Discount:</td>
                                  <td className="text-right tr-price">- &#8377; {cart.coupon_discount}</td>
                              </tr>
                              <tr className="border-bottom-1 w-100 total-bg-table-tr">
                                  <td className="text-left tr-price font-bold">Total:</td>
                                  <td className="text-right tr-price font-bold">&#8377; {cart.total_price_with_coupon_dicount}</td>
                              </tr>
                          </thead>
                      </table>
                  </IonCard>

                  <IonItemDivider className="cart-divider-total" slot="fixed">
                      <IonRow className="ion-align-items-center ion-justify-content-between p-0 w-100">
                          <IonCol
                              size="6"
                              className='text-left'
                          >
                              <IonText className="text-left mb-0 pb-0">
                                  <h4 className="text-left mb-0 pb-0 mt-0 pt-0">&#8377; {cart.total_price_with_coupon_dicount}</h4>
                              </IonText>
                          </IonCol>
                          <IonCol
                              size="6"
                              className='text-right'
                          >
                              <IonButton className="pagination-btn m-0" fill='solid' color="success" onClick={()=>setIsOpen(true)}>
                                  Checkout
                                  <IonIcon slot="end" icon={chevronForwardOutline}></IonIcon>
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

export default Cart;
