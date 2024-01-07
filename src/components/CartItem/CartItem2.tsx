import { IonRow, IonCol, IonButton, IonIcon, IonImg, IonSpinner } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { useState } from "react";
import CartQuantityMain from "../CartQuantityMain";

type Props = {
    id: number;
    name: string;
    slug: string;
    description?: string;
    meta_title?: string;
    meta_keywords?: string;
    meta_description?: string;
    featured_image_link?: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    discount: number;
    discounted_price: number;
    image_alt?: string;
    image_title?: string;
    in_stock: boolean;
    inventory: number;
    is_best_sale: boolean;
    is_featured: boolean;
    is_new_arrival: boolean
    price: number;
    quantity: number;
    total_quantity_price: number;
    weight: string;
    loading?: boolean
    deleteHandler?: (data:number) => void
    incrementProductQuantity?: (product_id:number) => Promise<void>
    decrementProductQuantity?: (product_id:number) => Promise<void>
};

const CartItem2: React.FC<Props> = ({id, name, weight, featured_image_link, discount, discounted_price, price, inventory, total_quantity_price, quantity=1, deleteHandler, loading, incrementProductQuantity, decrementProductQuantity}) => {
    const [quantityLoading, setQuantityLoading] = useState<boolean>(false);
    const [imgLoading, setImgLoading] = useState<boolean>(true);

    const deleteClickHandler = () => {
        deleteHandler && deleteHandler(id);
    }

    const incrementQuantity = async () => {
        try {
            setQuantityLoading(true);
            incrementProductQuantity && await incrementProductQuantity(id);
        } finally {
            setQuantityLoading(false);
        }
    };
    const decrementQuantity = async () => {
        try {
            setQuantityLoading(true);
            decrementProductQuantity && await decrementProductQuantity(id)
        } finally {
            setQuantityLoading(false);
        }
    };

    return (
        <div className="cart-item-main-container">
            <div className="page-padding">
                <IonRow className="ion-align-items-center ion-justify-content-between p-0 w-100 gap-1">
                    <IonCol
                        size="3"
                    >
                        <div className='cart-item-img-container'>
                            {
                                imgLoading &&
                                <div className="text-center mt-1">
                                    <IonSpinner color='success' />
                                </div>
                            }
                            <IonImg alt="product" className='cart-item-product-img' src={featured_image_link} style={imgLoading ? {visibility: 'Hidden'}:{visibility: 'visible'}} onIonImgDidLoad={()=>setImgLoading(false)} />
                        </div>
                    </IonCol>
                    <IonCol
                        size="9"
                    >
                        <div className="cart-item-detail-main-container">
                            <div className="cart-item-name-price">
                                <h3>{name}</h3>
                                <h6>&#8377;{discounted_price} / {weight}</h6>
                            </div>
                            <div className="cart-item-delete">
                                {loading ? <IonSpinner name="dots" color={'danger'}></IonSpinner> : 
                                <IonButton className="pagination-btn m-0" fill='clear' color="danger" disabled={loading} onClick={deleteClickHandler}>
                                    <IonIcon icon={trashOutline}></IonIcon>
                                </IonButton>}
                            </div>
                        </div>
                        <div className="cart-item-quantity-main-container">
                            <div className="cart-item-total-price">
                                <h4><b>&#8377;{total_quantity_price}</b></h4>
                            </div>
                            <div className="cart-item-quantative">
                                <CartQuantityMain quantity={quantity} loading={quantityLoading} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} />
                            </div>
                        </div>
                    </IonCol>
                </IonRow>
            </div>
        </div>
    );
}

export default CartItem2;