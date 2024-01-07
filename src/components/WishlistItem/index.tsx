import { IonRow, IonCol, IonButton, IonIcon, IonImg, IonSpinner } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { useState } from "react";
import { useCart } from "../../context/CartProvider2";
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
    weight: string;
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
    price: number
    loading?: boolean
    deleteHandler?: (data:number) => void
};

const WishlistItem: React.FC<Props> = ({id, name, slug, description, featured_image_link, discount, discounted_price, price, inventory, weight, deleteHandler, loading}) => {
    const {cart, incrementProductQuantity, decrementProductQuantity } = useCart();
    const [cartLoading, setCartLoading] = useState<boolean>(false);
    const [imgLoading, setImgLoading] = useState<boolean>(true);

    const deleteClickHandler = () => {
        deleteHandler && deleteHandler(id);
    }

    const incrementQuantity = async () => {
        try {
            setCartLoading(true);
            await incrementProductQuantity(id);
        } finally {
            setCartLoading(false);
        }
    };
    const decrementQuantity = async () => {
        try {
            setCartLoading(true);
            await decrementProductQuantity(id)
        } finally {
            setCartLoading(false);
        }
    };

    return (
        <div className="cart-item-main-container wishlist-item-main-container">
            <div className="page-padding">
                <IonRow className="ion-align-items-start ion-justify-content-between p-0 w-100 gap-1">
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
                            <div className="cart-item-quantative">
                                <CartQuantityMain quantity={cart ? (cart.products.filter(item => item.id===id).length>0 ? cart.products.filter(item => item.id===id)[0].quantity : 0) : 0} loading={cartLoading} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} />
                            </div>
                        </div>
                    </IonCol>
                </IonRow>
            </div>
        </div>
    );
}

export default WishlistItem;