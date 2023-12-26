import { IonButton, IonCard, IonCardHeader, IonImg, IonSpinner, IonText } from "@ionic/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import './ProductCard.css'
import CartQuantityMain from "../CartQuantityMain";
import { useCart } from "../../context/CartProvider2";

export type Props = {
    id: number,
    name: string,
    image?: string,
    price: number,
    discounted_price: number,
    link: string,
};

const ProductCard: React.FC<Props> = ({id, image, name, price, discounted_price, link}) => {
    const [imgLoading, setImgLoading] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const {incrementProductQuantity, decrementProductQuantity, cart} = useCart();
    
    const incrementQuantity = async () => {
        try {
            setLoading(true);
            await incrementProductQuantity(id);
        } finally {
            setLoading(false);
        }
    };
    const decrementQuantity = async () => {
        try {
            setLoading(true);
            await decrementProductQuantity(id)
        } finally {
            setLoading(false);
        }
    };
    
    return <IonCard className="product-card">
        <Link className="no-underline" to={link}>
            {
                imgLoading &&
                <div className="text-center mt-1">
                    <IonSpinner color='success' />
                </div>
            }
            <IonImg alt="product" src={image} style={imgLoading ? {visibility: 'Hidden'}:{visibility: 'visible'}} className="product-card-image" onIonImgDidLoad={()=>setImgLoading(false)} />
        </Link>
        <IonCardHeader className="product-card-header">
            <IonText color="success">
                <p className="product-card-text">{name}</p>
                <p className="product-card-price">&#8377;{discounted_price}</p>
            </IonText>
            <CartQuantityMain quantity={cart ? (cart.products.filter(item => item.id===id).length>0 ? cart.products.filter(item => item.id===id)[0].quantity : 0) : 0} loading={loading} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} />
        </IonCardHeader>
    </IonCard>
}

export default ProductCard;