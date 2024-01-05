import { IonBadge, IonCol, IonLabel, IonRow, IonText } from "@ionic/react";
import { Order } from "../../helper/types";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import './OrderCard.css';

const OrderCard: React.FC<Order> = ({receipt, total_price_with_coupon_dicount, created_at, order_status, products, id}) => {
    const productNames = useMemo(() => products.map(item => item.name).join(', '), [id]);
    
    return <Link className='no-underline' to={`/orders/${receipt}`}>
        <div className='order-card'>
            <IonRow className="ion-justify-content-between w-100">
                <IonCol
                    size="9"
                    className='text-left'
                >
                    <IonLabel class='order-card-product-label'>
                        <h3 className='order-card-product-names'>{productNames}</h3>
                    </IonLabel>
                </IonCol>
                <IonCol
                    size="3"
                    className='text-right'
                >
                    <IonText>
                        <b className='order-card-product-price'>&#8377;{total_price_with_coupon_dicount}</b>
                    </IonText>
                </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-end ion-justify-content-between w-100">
                <IonCol
                    size="9"
                    className='text-left'
                >
                    <IonText>
                        <p className='order-card-product-order-id'>
                            Order#{id}
                        </p>
                        <p className='order-card-product-timestamp'>
                            Placed: {created_at}
                        </p>
                    </IonText>
                </IonCol>
                <IonCol
                    size="3"
                    className='text-right'
                >
                    <IonBadge color="dark">{order_status}</IonBadge>
                </IonCol>
            </IonRow>
        </div>
    </Link>
}

export default OrderCard;