import {
    IonButton,
    IonRow,
    IonCol,
    IonItem,
    IonIcon,
    IonInput,
    IonSpinner,
} from "@ionic/react";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { informationCircleOutline } from "ionicons/icons";
import { ErrorMessage } from "@hookform/error-message";
import { useCart } from "../../context/CartProvider2";
import { axiosPublic } from "../../../axios";
import { api_routes } from "../../helper/routes";

type Props = {
    couponForm: UseFormReturn<{
        coupon_code: string;
    }, any, undefined>
}

const CouponCode2: React.FC<Props> = ({couponForm}) => {
    const {updateCartData} = useCart();
    const [loadingCoupon, setLoadingCoupon] = useState<boolean>(false);
    const [couponResponseMessage, setCouponResponseMessage] = useState<{
      message: string,
      status: 'success'|'error'
    }>({
      message: '',
      status: 'error'
    });

    const onCouponSubmitHandler = async (data: any) => {
      setLoadingCoupon(true);
      setCouponResponseMessage({
          message: '',
          status: 'error'
      });
      try {
        const response = await axiosPublic.post(api_routes.coupon, data);
          updateCartData(response.data.cart)
          setCouponResponseMessage({
              message: `Coupon Discount: Rs. ${response.data.cart.coupon_discount} Applied`,
              status: 'success'
          });
      } catch (error: any) {
        if (error?.response?.data?.errors?.coupon_code) {
          couponForm.setError("coupon_code", {
            type: "server",
            message: error?.response?.data?.errors?.coupon_code[0],
          });
        }
      } finally {
        setLoadingCoupon(false);
      }
    };

    return (
        <div className='page-padding cart-coupon-code-container'>
            <form onSubmit={couponForm.handleSubmit(onCouponSubmitHandler)}>
                <IonRow className="ion-align-items-center ion-justify-content-between p-0 w-100">
                    <IonCol
                        size="9"
                        className='text-left coupon-left-col'
                    >
                        <IonItem className="coupon-code-input-item">
                            <IonInput
                            className="coupon-code-input-holder"
                            clearInput={true}
                            color='success'
                            placeholder="Enter Coupon Code"
                            {...couponForm.register('coupon_code')}
                            ></IonInput>
                        </IonItem>
                        <ErrorMessage
                            errors={couponForm.formState.errors}
                            name={'coupon_code'}
                            as={<div style={{ color: 'red' }} />}
                        />
                    </IonCol>
                    <IonCol
                        size="3"
                        className='text-center'
                    >
                        <IonButton className="m-0 w-100" type='submit' size='default' mode="md" fill='solid' color="success">
                            {loadingCoupon ? (
                                <IonSpinner name="crescent" color='light'></IonSpinner>
                            ) : (
                                "Apply"
                            )}
                        </IonButton>
                    </IonCol>
                    {couponResponseMessage.message.length>0 && <IonCol
                        size="12"
                        className='text-center'
                    >
                        {couponResponseMessage.status=='error' ? 
                            null :
                            <p className={`text-${couponResponseMessage.status} mb-0 d-flex ion-align-items-center ion-justify-content-center`}><IonIcon slot="start" className={`info-icon-green`} icon={informationCircleOutline}></IonIcon> {couponResponseMessage.message}</p>
                        }
                    </IonCol>}
                </IonRow>
            </form>
        </div>
    );
};

export default CouponCode2;
