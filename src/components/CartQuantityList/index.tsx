import { IonButton, IonIcon, IonInput, IonSpinner } from "@ionic/react";
import { cartOutline } from "ionicons/icons";
import { useEffect, useState } from "react";

type CartQuantityProps = {
  max_quantity: number;
  quantity_count: number;
  cartLoading?: boolean;
  cartHandler: (data:number)=>void;
};

const CartQuantityList: React.FC<CartQuantityProps> = ({max_quantity, cartHandler, cartLoading=false, quantity_count}) => {
    const [quantity, setQuantity] = useState<number>(quantity_count);

    const incrementQuantity = () => setQuantity(Math.min(quantity+1, max_quantity));
    const decrementQuantity = () => setQuantity(Math.max(1, quantity-1));

    const cartClickHandler = () => cartHandler(quantity);

    useEffect(() => {
      setQuantity(quantity_count)
    
      return () => {}
    }, [quantity_count])
    

    return (
      <div className="d-flex ion-align-items-center">
          <div className="quantity-holder">
              <div className="col-auto">
                  <IonButton color={'success'} size="small" onClick={decrementQuantity} className="m-0 h-100 p-0">
                      -
                  </IonButton>
              </div>
              <div className="col-3">
                  <IonInput type="number" inputmode="numeric" aria-label="Quantity" value={quantity} className="text-center quantity-text-holder"></IonInput>
              </div>
              <div className="col-auto">
                  <IonButton color={'success'} size="small" onClick={incrementQuantity} className="m-0 h-100 p-0">
                      +
                  </IonButton>
              </div>
          </div>
          {cartLoading ? <IonSpinner name="dots" color={'success'}></IonSpinner> : <IonButton color={'success'} size="small" className="p-0 cart-btn"  disabled={cartLoading} onClick={cartClickHandler}>
              <IonIcon icon={cartOutline}></IonIcon>
          </IonButton>}
      </div>
    );
}

export default CartQuantityList;