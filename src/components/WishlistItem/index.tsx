import { IonItemGroup, IonItemDivider, IonRow, IonCol, IonLabel, IonButton, IonIcon, IonImg, IonText, IonSpinner } from "@ionic/react";
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

const WishlistItem: React.FC<Props> = ({id, name, slug, description, featured_image_link, discount, discounted_price, price, inventory, deleteHandler, loading}) => {
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
        <IonItemGroup>
            <IonItemDivider className="cart-divider">
                <IonRow className="ion-align-items-center ion-justify-content-between p-0 mt- w-100">
                    <IonCol
                        size="10"
                        className='text-left'
                    >
                        <IonLabel>{name}</IonLabel>
                    </IonCol>
                    <IonCol
                        size="2"
                        className='text-right'
                    >
                        {loading ? <IonSpinner name="dots" color={'danger'}></IonSpinner> : 
                        <IonButton className="pagination-btn m-0" fill='outline' color="danger" disabled={loading} onClick={deleteClickHandler}>
                            <IonIcon icon={trashOutline}></IonIcon>
                        </IonButton>}
                    </IonCol>
                </IonRow>
            </IonItemDivider>
            <div className="ion-padding p-inline-5">
                <IonRow className="ion-align-items-center p-0 mt- w-100">
                    <IonCol
                        size="2"
                        className='text-left'
                    >
                        <div className='product-img-container'>
                            {
                                imgLoading &&
                                <div className="text-center mt-1">
                                    <IonSpinner color='success' />
                                </div>
                            }
                            <IonImg alt="product" className='' src={featured_image_link} style={imgLoading ? {visibility: 'Hidden'}:{visibility: 'visible'}} onIonImgDidLoad={()=>setImgLoading(false)} />
                        </div>
                    </IonCol>
                    <IonCol
                        size="5"
                        className='text-left'
                    >
                        <p className="limit-text-2 mt-0 pt-0 mb-0 pb-0">{description}</p>
                    </IonCol>
                    <IonCol
                        size="5"
                        className='text-right'
                    >
                        <CartQuantityMain quantity={cart ? (cart.products.filter(item => item.id===id).length>0 ? cart.products.filter(item => item.id===id)[0].quantity : 0) : 0} loading={cartLoading} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} />
                    </IonCol>
                </IonRow>
                <table className="mt-1 w-100 border-1">
                    <thead className="w-100">
                        <tr className="border-bottom-1 w-100">
                            <td className="text-left tr-price">Price:</td>
                            <td className="text-right tr-price">&#8377; {price}</td>
                        </tr>
                        <tr className="border-bottom-1 w-100">
                            <td className="text-left tr-price">Discount:</td>
                            <td className="text-right tr-price">{discount}%</td>
                        </tr>
                        <tr className="border-bottom-1 w-100">
                            <td className="text-left tr-price font-bold">Total:</td>
                            <td className="text-right tr-price font-bold">&#8377; {discounted_price}</td>
                        </tr>
                    </thead>
                </table>
            </div>
        </IonItemGroup>
    );
}

export default WishlistItem;