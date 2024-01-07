import {
    IonPage,
    IonContent,
    IonItem,
    IonIcon,
    IonLabel,
    IonRefresher,
    IonRefresherContent,
    RefresherEventDetail,
} from "@ionic/react";
import { useContext } from "react";
import OrderItem from "../../../components/OrderItem";
import BackHeader from "../../../components/BackHeader";
import { callOutline, locationOutline, mailOutline, personOutline } from "ionicons/icons";
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
    const { data:order, isLoading:loading, mutate } = useSWR<Order>(auth.authenticated ? api_routes.place_order_detail+`/${match.params.receipt}` : null, fetcher);
    
    return (
        <IonPage>
            <BackHeader title='Order Detail' link='/orders' />
            <IonContent fullscreen={false} forceOverscroll={false}>
                <IonRefresher slot="fixed" onIonRefresh={(event: CustomEvent<RefresherEventDetail>)=>{
                    auth.authenticated && mutate();
                    event.detail.complete();
                }}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                {
                    loading ? <>
                        <LoadingPricingTable />
                        <LoadingPricingTable />
                    </>: 
                    (order && <>
                    <div className="mt-1">
                        <div className="product-detail-main-specification">
                            <div className="page-padding product-detail-main-content-heading">
                                <h6>Order Information</h6>
                            </div>

                            <div className="page-padding cart-pricing-main-table">
                                <table className="w-100">
                                    <thead className="w-100">
                                        <tr className="w-100">
                                            <td className="text-left tr-price">Order ID</td>
                                            <td className="text-right tr-price">Order#{order.id}</td>
                                        </tr>
                                        <tr className="w-100">
                                            <td className="text-left tr-price">Payment Mode</td>
                                            <td className="text-right tr-price">{order.mode_of_payment}</td>
                                        </tr>
                                        <tr className="w-100">
                                            <td className="text-left tr-price">Payment Status</td>
                                            <td className="text-right tr-price">{order.payment_status}</td>
                                        </tr>
                                        <tr className="w-100">
                                            <td className="text-left tr-price">Order Status</td>
                                            <td className="text-right tr-price">{order.order_status}</td>
                                        </tr>
                                        {order.coupon.code && <tr className="w-100">
                                            <td className="text-left tr-price">Coupon Code</td>
                                            <td className="text-right tr-price">{order.coupon.code} ({order.coupon.discount}%)</td>
                                        </tr>}
                                        <tr className="w-100">
                                            <td className="text-left tr-price">Reciept</td>
                                            <td className="text-right tr-price">{order.receipt}</td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div className="product-detail-main-specification">
                            <div className="page-padding product-detail-main-content-heading">
                                <h6>Billing Information</h6>
                            </div>

                            <div>
                                <IonItem lines="inset">
                                    <IonIcon icon={personOutline} slot="start"></IonIcon>
                                    <IonLabel color='dark'>
                                        {order.billing_first_name} {order.billing_last_name}
                                    </IonLabel>
                                </IonItem>
                                <IonItem lines="inset">
                                    <IonIcon icon={mailOutline} slot="start"></IonIcon>
                                    <IonLabel color='dark'>
                                        {order.billing_email}
                                    </IonLabel>
                                </IonItem>
                                <IonItem lines="inset">
                                    <IonIcon icon={callOutline} slot="start"></IonIcon>
                                    <IonLabel color='dark'>
                                        {order.billing_phone}
                                    </IonLabel>
                                </IonItem>
                                <IonItem lines="inset">
                                    <IonIcon icon={locationOutline} slot="start"></IonIcon>
                                    <IonLabel color='dark' className="ion-text-wrap">
                                        <p className="text-black">{order.billing_address_1}</p>
                                        {order.billing_address_2 ? <p className="text-black">{order.billing_address_2}</p> : null}
                                        <p className="text-black">{order.billing_city} - {order.billing_pin}</p>
                                        <p className="text-black">{order.billing_state}, {order.billing_country}</p>
                                    </IonLabel>
                                </IonItem>
                            </div>
                        </div>
                        <div className="product-detail-main-specification">
                            <div className="page-padding product-detail-main-content-heading">
                                <h6>Order Items</h6>
                            </div>

                            <div className="">
                                {
                                    order.products.map((item, i) => <OrderItem {...item} key={i} />)
                                }
                            </div>

                        </div>
                        <div className="product-detail-main-specification">
                            <div className="page-padding product-detail-main-content-heading">
                                <h6>Pricing Information</h6>
                            </div>

                            <div className="cart-pricing-main-table">
                                <div className="page-padding">
                                    <table className="w-100">
                                        <thead className="w-100">
                                            <tr className="w-100">
                                                <td className="text-left tr-price">Total Items</td>
                                                <td className="text-right tr-price">{order.total_items}</td>
                                            </tr>
                                            <tr className="w-100">
                                                <td className="text-left tr-price">Sub Total</td>
                                                <td className="text-right tr-price">&#8377; {order.sub_total}</td>
                                            </tr>
                                            <tr className="w-100">
                                                <td className="text-left tr-price">Total Discount</td>
                                                <td className="text-right tr-price">- &#8377; {order.total_discount}</td>
                                            </tr>
                                            <tr className="w-100">
                                                <td className="text-left tr-price">GST</td>
                                                <td className="text-right tr-price">+ &#8377; {order.gst_charge}</td>
                                            </tr>
                                            <tr className="w-100">
                                                <td className="text-left tr-price">Delivery Charge</td>
                                                <td className="text-right tr-price">+ &#8377; {order.delivery_charge}</td>
                                            </tr>
                                            <tr className="w-100">
                                                <td className="text-left tr-price">Cumulative Total</td>
                                                <td className="text-right tr-price">&#8377; {(order.total_price_with_gst_delivery_charge).toFixed(2)}</td>
                                            </tr>
                                            <tr className="w-100">
                                                <td className="text-left tr-price">Coupon Discount</td>
                                                <td className="text-right tr-price">- &#8377; {order.coupon_discount}</td>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <div className="page-padding total-bg-table-tr">
                                    <table className="w-100">
                                        <thead className="w-100">
                                            <tr className="w-100">
                                                <td className="text-left tr-price">Total</td>
                                                <td className="text-right tr-price">&#8377; {order.total_price_with_coupon_dicount}</td>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                        
                </>)
                }

            </IonContent>
        </IonPage>
    );
};

export default OrderDetail;
