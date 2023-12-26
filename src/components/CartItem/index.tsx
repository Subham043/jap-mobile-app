import { IonItemGroup, IonItemDivider, IonRow, IonCol, IonLabel, IonButton, IonIcon, IonImg, IonText, IonSpinner } from "@ionic/react";
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
    loading?: boolean
    deleteHandler?: (data:number) => void
    incrementProductQuantity?: (product_id:number) => Promise<void>
    decrementProductQuantity?: (product_id:number) => Promise<void>
};

const CartItem: React.FC<Props> = ({id, name, slug, description, featured_image_link, discount, discounted_price, price, inventory, total_quantity_price, quantity=1, deleteHandler, loading, incrementProductQuantity, decrementProductQuantity}) => {
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
        <IonItemGroup>
            <div className="cart-divider p-0 w-100 cart-divider-main">
                <IonRow className="ion-align-items-center ion-justify-content-between p-0 w-100 cart-divider-heading-row">
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
                        <IonButton className="pagination-btn m-0" fill='solid' color="danger" disabled={loading} onClick={deleteClickHandler}>
                            <IonIcon icon={trashOutline}></IonIcon>
                        </IonButton>}
                    </IonCol>
                </IonRow>
            </div>
            <div className="ion-padding p-inline-5">
                <IonRow className="ion-align-items-center p-0 w-100">
                    <IonCol
                        size="5"
                        className='text-left'
                    >
                        <div className='product-img-container mb-1'>
                            {
                                imgLoading &&
                                <div className="text-center mt-1">
                                    <IonSpinner color='success' />
                                </div>
                            }
                            <IonImg alt="product" className='cart-product-img' src={featured_image_link} style={imgLoading ? {visibility: 'Hidden'}:{visibility: 'visible'}} onIonImgDidLoad={()=>setImgLoading(false)} />
                        </div>
                        {description && <p className="limit-text-2 mt-0 pt-0 mb-0 pb-0">{description}</p>}
                        <p className="mt-0 pt-0 mb-0 pb-0">Price: <b>&#8377;{discounted_price}</b></p>
                    </IonCol>
                    <IonCol
                        size="5"
                        className='text-right'
                    >
                        <CartQuantityMain quantity={quantity} loading={quantityLoading} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} />
                    </IonCol>
                    <IonCol
                        size="2"
                        className='text-right'
                    >
                        <IonText color="success" className="text-right mb-0 pb-0">
                            <h6 className="text-right mb-0 pb-0 mt-0 pt-0"><b>&#8377;{total_quantity_price}</b></h6>
                        </IonText>
                    </IonCol>
                </IonRow>
            </div>
        </IonItemGroup>
    );
}

export default CartItem;