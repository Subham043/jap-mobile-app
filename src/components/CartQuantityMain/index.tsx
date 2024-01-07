import { IonButton, IonIcon, IonInput, IonSpinner } from "@ionic/react";
import React from "react";
import './CartQuantity.css';
import { cartOutline } from "ionicons/icons";

type CartQuantityType = {
    quantity:number;
    loading:boolean;
    incrementQuantity:()=>void;
    decrementQuantity:()=>void;
}

const CartQuantityMain: React.FC<CartQuantityType> = ({quantity, loading, incrementQuantity, decrementQuantity}) => {

    return (quantity===0 ? <IonButton fill='solid' color="success" className="add-to-cart-btn" mode="md" disabled={loading} onClick={()=>incrementQuantity()}>
                {loading ? <IonSpinner name="dots" color='light' /> : <>
                    <IonIcon slot="start" icon={cartOutline}></IonIcon>
                    Add
                </>}
            </IonButton> : 
            <div className="cart-quantity-holder">
                <div className="col-cart-quantity-auto">
                    <IonButton color='success' size="small" className="col-cart-quantity-btn" disabled={loading} onClick={()=>decrementQuantity()}>
                        {loading ? <IonSpinner name="dots" color='light' /> : '-'}
                    </IonButton>
                </div>
                <div className="col-cart-quantity-input">
                    <IonInput type="number" inputmode="numeric" aria-label="Quantity" value={quantity} className="text-center cart-quantity-text-holder" readonly={true} />
                </div>
                <div className="col-cart-quantity-auto">
                    <IonButton color='success' size="small" className="col-cart-quantity-btn" disabled={loading} onClick={()=>incrementQuantity()}>
                        {loading ? <IonSpinner name="dots" color='light' /> : '+'}
                    </IonButton>
                </div>
            </div>);
}

export default CartQuantityMain;