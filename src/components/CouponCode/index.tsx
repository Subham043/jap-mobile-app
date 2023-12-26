import {
    IonButton,
    IonRow,
    IonCol,
    IonItem,
    IonIcon,
    IonInput,
    IonCard,
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

const CouponCode: React.FC<Props> = ({couponForm}) => {
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
        <IonCard className="final-table mt-2 mb-2">
            <div className='ion-padding pt-0 pb-0'>
                <div className="content-main mt-1">
                    <h6>Coupon Code</h6>
                </div>
            </div>
            <div className='ion-padding'>
            <form onSubmit={couponForm.handleSubmit(onCouponSubmitHandler)}>
                <IonRow className="ion-align-items-center ion-justify-content-between p-0 w-100">
                    <IonCol
                        size="9"
                        className='text-left'
                    >
                        <IonItem>
                            <IonInput
                            className="coupon-code-input-holder"
                            clearInput={true}
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
                        className='text-right'
                    >
                        <IonButton className="m-0" type='submit' size="small" fill='outline' color="success">
                            {loadingCoupon ? (
                                <IonSpinner name="crescent" color={'success'}></IonSpinner>
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
        </IonCard>
    );
};

export default CouponCode;
