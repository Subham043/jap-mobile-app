import { IonRow, IonCol, IonImg, IonText, IonSpinner, IonItemDivider } from "@ionic/react";
import { CartProducts } from "../../helper/types";
import { useState } from "react";
import './OrderItem.css';

const OrderItem: React.FC<CartProducts> = ({featured_image_link, name, weight, quantity, discounted_price, total_quantity_price}) => {
    const [imgLoading, setImgLoading] = useState<boolean>(true);
    return (
        <IonItemDivider className="cart-divider order-divider-item-main">
            <IonRow className="ion-align-items-center ion-justify-content-between w-100">
                <IonCol
                    size="7"
                    className='text-left'
                >
                    <div className='order-item-detail-wrapper'>
                        {
                            imgLoading &&
                            <div className="text-center mt-1">
                                <IonSpinner color='dark' />
                            </div>
                        }
                        <IonImg alt="product" className='cart-card-item-img order-item-img' src={featured_image_link} onIonImgDidLoad={()=>setImgLoading(false)} />
                        <IonText color="dark" class='order-item-text'>
                            <p className="cart-card-item-text order-item-name">{name}</p>
                            <p className="cart-card-item-price"><b>&#8377;{discounted_price} / {weight}</b></p>
                        </IonText>
                    </div>
                </IonCol>
                <IonCol
                    size="3"
                    className='text-center'
                >
                    <p className='order-detail-price-text'>Qty: {quantity}</p>
                </IonCol>
                <IonCol
                    size="2"
                    className='text-right'
                >
                    <p className='order-detail-price-text'>&#8377;{total_quantity_price}</p>
                </IonCol>
            </IonRow>
        </IonItemDivider>
    );
}

export default OrderItem;