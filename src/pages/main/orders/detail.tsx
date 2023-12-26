import {
    IonPage,
    IonContent,
    IonItem,
    IonCard,
    IonIcon,
    IonLabel,
    IonItemDivider,
    IonRow,
    IonCol,
    IonImg,
    IonText,
} from "@ionic/react";
import { useContext } from "react";
import OrderItem from "../../../components/OrderItem";
import BackHeader from "../../../components/BackHeader";
import { callOutline, homeOutline, mailOutline, personOutline } from "ionicons/icons";
import { RouteComponentProps } from "react-router";
import { api_routes } from "../../../helper/routes";
import { axiosPublic } from "../../../../axios";
import { Order } from "../../../helper/types";
import { AuthContext } from "../../../context/AuthProvider";
import LoadingPricingTable from "../../../components/LoadingPricingTable";
import useSWR from 'swr'

const fetcher = (url: string) => axiosPublic.get(url).then((res) => res.data.order);

interface OrderProps extends RouteComponentProps<{
    receipt: string;
}> {}

const OrderDetail: React.FC<OrderProps> = ({match}) => {
    const {auth} = useContext(AuthContext);
    const { data:order, isLoading:loading } = useSWR<Order>(auth.authenticated ? api_routes.place_order_detail+`/${match.params.receipt}` : null, fetcher);
    
    return (
        <IonPage>
            <BackHeader title='Order Detail' link='/orders' />
            <IonContent fullscreen={false} forceOverscroll={false} style={{'--background':'#f9f9f9'}}>

                {
                    loading ? <>
                        <LoadingPricingTable />
                        <LoadingPricingTable />
                    </>: 
                    (order && <>
                    <IonCard className="mt-2 mb-2">
                            <div className='ion-padding pt-0 pb-2'>
                                <div className="content-main mt-1">
                                    <h6>Order Information</h6>
                                </div>
                            </div>
                            <table className="w-100 border-final-1">
                                <thead className="w-100">
                                    <tr className="border-bottom-1 w-100">
                                        <td className="text-left tr-price">Reciept:</td>
                                        <td className="text-right tr-price">{order.receipt}</td>
                                    </tr>
                                    <tr className="border-bottom-1 w-100">
                                        <td className="text-left tr-price">Order ID:</td>
                                        <td className="text-right tr-price">Order#{order.id}</td>
                                    </tr>
                                    <tr className="border-bottom-1 w-100">
                                        <td className="text-left tr-price">Payment Mode:</td>
                                        <td className="text-right tr-price">{order.mode_of_payment}</td>
                                    </tr>
                                    <tr className="border-bottom-1 w-100">
                                        <td className="text-left tr-price">Payment Status:</td>
                                        <td className="text-right tr-price">{order.payment_status}</td>
                                    </tr>
                                    <tr className="border-bottom-1 w-100">
                                        <td className="text-left tr-price">Order Status:</td>
                                        <td className="text-right tr-price">{order.order_status}</td>
                                    </tr>
                                    {order.coupon.code && <tr className="border-bottom-1 w-100">
                                        <td className="text-left tr-price">Coupon:</td>
                                        <td className="text-right tr-price">{order.coupon.code} ({order.coupon.discount}%)</td>
                                    </tr>}
                                </thead>
                            </table>
                        </IonCard>

                        <IonCard className="cart-card mt-2 mb-2">
                            <div className='ion-padding pt-0 pb-0 mb-1'>
                                <div className="content-main mt-1 mb-1">
                                    <h6>Order Items</h6>
                                </div>
                            </div>
                            {
                                order.products.map((item, i) => <OrderItem {...item} key={i} />)
                            }
                        </IonCard>

                        <IonCard className="mt-2 mb-2">
                            <div className='ion-padding pt-0 pb-0'>
                                <div className="content-main mt-1">
                                    <h6>Billing Information</h6>
                                </div>
                            </div>
                            <div>
                                <IonItem lines="inset">
                                    <IonIcon icon={personOutline} slot="start"></IonIcon>
                                    <IonLabel>
                                        <p>{order.billing_first_name} {order.billing_last_name}</p>
                                    </IonLabel>
                                </IonItem>
                                <IonItem lines="inset">
                                    <IonIcon icon={mailOutline} slot="start"></IonIcon>
                                    <IonLabel>
                                        <p>{order.billing_email}</p>
                                    </IonLabel>
                                </IonItem>
                                <IonItem lines="inset">
                                    <IonIcon icon={callOutline} slot="start"></IonIcon>
                                    <IonLabel>
                                        <p>{order.billing_phone}</p>
                                    </IonLabel>
                                </IonItem>
                                <IonItem lines="inset">
                                    <IonIcon icon={homeOutline} slot="start"></IonIcon>
                                    <IonLabel className="ion-text-wrap">
                                        <p>{order.billing_address_1}</p>
                                        {order.billing_address_2 ? <p>{order.billing_address_2}</p> : null}
                                        <p>{order.billing_city} - {order.billing_pin}</p>
                                        <p>{order.billing_state}, {order.billing_country}</p>
                                    </IonLabel>
                                </IonItem>
                            </div>
                            
                        </IonCard>
                        
                        <IonCard className="mt-2">
                            <div className='ion-padding pt-0 pb-2'>
                                <div className="content-main mt-1">
                                    <h6>Pricing Information</h6>
                                </div>
                            </div>
                            <table className="w-100 border-final-1">
                                <thead className="w-100">
                                    <tr className="border-bottom-1 w-100">
                                        <td className="text-left tr-price">Total Items:</td>
                                        <td className="text-right tr-price">{order.total_items}</td>
                                    </tr>
                                    <tr className="border-bottom-1 w-100">
                                        <td className="text-left tr-price">Sub Total:</td>
                                        <td className="text-right tr-price">&#8377; {order.sub_total}</td>
                                    </tr>
                                    <tr className="border-bottom-1 w-100">
                                        <td className="text-left tr-price">Total Discount:</td>
                                        <td className="text-right tr-price">- &#8377; {order.total_discount}</td>
                                    </tr>
                                    <tr className="border-bottom-1 w-100">
                                        <td className="text-left tr-price">GST:</td>
                                        <td className="text-right tr-price">+ &#8377; {order.gst_charge}</td>
                                    </tr>
                                    <tr className="border-bottom-1 w-100">
                                        <td className="text-left tr-price">Delivery Charge:</td>
                                        <td className="text-right tr-price">+ &#8377; {order.delivery_charge}</td>
                                    </tr>
                                    <tr className="border-bottom-1 w-100">
                                        <td className="text-left tr-price font-bold">Cumulative Total:</td>
                                        <td className="text-right tr-price font-bold">&#8377; {(order.total_price_with_gst_delivery_charge).toFixed(2)}</td>
                                    </tr>
                                    <tr className="border-bottom-1 w-100">
                                        <td className="text-left tr-price">Coupon Discount:</td>
                                        <td className="text-right tr-price">- &#8377; {order.coupon_discount}</td>
                                    </tr>
                                    <tr className="border-bottom-1 w-100 total-bg-table-tr">
                                        <td className="text-left tr-price font-bold">Total:</td>
                                        <td className="text-right tr-price font-bold">&#8377; {order.total_price_with_coupon_dicount}</td>
                                    </tr>
                                </thead>
                            </table>
                        </IonCard>
                    </>)
                }

            </IonContent>
        </IonPage>
    );
};

export default OrderDetail;
