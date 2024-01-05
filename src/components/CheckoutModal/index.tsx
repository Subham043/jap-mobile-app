import {
    IonButton,
    IonItem,
    IonModal,
    IonList,
    IonTextarea,
    IonSpinner,
    IonSelect,
    IonSelectOption,
    useIonLoading,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { UseFormReturn, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { Browser } from '@capacitor/browser';
import { useCart } from "../../context/CartProvider2";
import { useToast } from "../../hooks/useToast";
import { axiosPublic } from "../../../axios";
import { api_routes } from "../../helper/routes";
import Input from "../Input";

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    couponForm: UseFormReturn<{
        coupon_code: string;
    }, any, undefined>;
}

const fields = [
    {
      placeholder: "Enter first name",
      label: "First Name",
      type: "text",
      name: "billing_first_name",
      inputmode: "text",
    },
    {
      placeholder: "Enter last name",
      label: "Last Name",
      type: "text",
      name: "billing_last_name",
      inputmode: "text",
    },
    {
      placeholder: "Enter email",
      label: "Email",
      type: "email",
      name: "billing_email",
      inputmode: "email",
    },
    {
        placeholder: "Enter phone",
        label: "Phone",
        type: "text",
        name: "billing_phone",
        inputmode: "numeric",
    },
    {
        placeholder: "Enter country",
        label: "Country",
        type: "text",
        name: "billing_country",
        inputmode: "text",
    },
    {
        placeholder: "Enter state",
        label: "State",
        type: "text",
        name: "billing_state",
        inputmode: "text",
    },
    {
        placeholder: "Enter city",
        label: "City",
        type: "text",
        name: "billing_city",
        inputmode: "text",
    },
    {
        placeholder: "Enter pin",
        label: "Pin",
        type: "text",
        name: "billing_pin",
        inputmode: "text",
    },
];

const schema = yup
  .object({
    billing_first_name: yup.string().required(),
    billing_last_name: yup.string().required(),
    billing_email: yup.string().email().required(),
    billing_phone: yup
      .string()
      .required()
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
    billing_country: yup.string().required(),
    billing_state: yup.string().required(),
    billing_city: yup.string().required(),
    billing_pin: yup.string().required(),
    billing_address_1: yup.string().required(),
    mode_of_payment: yup.string().required(),
  })
  .required();

const CheckoutModal: React.FC<Props> = ({isOpen, setIsOpen, couponForm}) => {
    const history = useHistory();
    const {cart, updateCart } = useCart();
    const {toastSuccess, toastError} = useToast();
    const [loadingCheckout, setLoadingCheckout] = useState(false);
    const [present, dismiss] = useIonLoading();

    const loadRazorpay = async(url:string, receipt:string) =>{
      await Browser.open({ url });
      Browser.addListener('browserFinished', async ()=>{
        try {
          await present({
            message: 'Verifying Payment...',
          });
          await axiosPublic.get(api_routes.place_order_detail+`/${receipt}`);
          toastSuccess('Order placed successfully.');
          reset({
            billing_first_name: "",
            billing_last_name: "",
            billing_email: "",
            billing_phone: "",
            billing_country: "",
            billing_state: "",
            billing_city: "",
            billing_pin: "",
            billing_address_1: "",
            mode_of_payment: "",
          });
          couponForm.setValue('coupon_code', '');
          await updateCart([])
          history.push({
            pathname: `/orders/${receipt}`,
            state: {success: true}
          })
          setIsOpen(false)
        } catch (error) {
            console.log(error);
        }finally{
          await dismiss()
        }
      });
    }

    const {
        handleSubmit,
        register,
        reset,
        setError,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });

    const onSubmit = async (data: any) => {
        
        setLoadingCheckout(true);
        try {
          const response = await axiosPublic.post(api_routes.place_order, {...data, ...couponForm.getValues(), order: cart?.products.map(item => {return {product_id:item.id, quantity: item.quantity}})});
          if(data.mode_of_payment==='Cash On Delivery'){
            toastSuccess(response.data.message);
            reset({
              billing_first_name: "",
              billing_last_name: "",
              billing_email: "",
              billing_phone: "",
              billing_country: "",
              billing_state: "",
              billing_city: "",
              billing_pin: "",
              billing_address_1: "",
              mode_of_payment: "",
            });
            couponForm.setValue('coupon_code', '');
            await updateCart([])
            history.push({
              pathname: `/orders/${response.data.order.receipt}`,
              state: {success: true}
            })
            setIsOpen(false)
          }else{
            loadRazorpay(response.data.order.payment_url, response.data.order.receipt);
          }
        } catch (error: any) {
          if (error?.response?.data?.message) {
            toastError(error?.response?.data?.message);
          }
          if (error?.response?.data?.errors?.billing_first_name) {
            setError("billing_first_name", {
              type: "server",
              message: error?.response?.data?.errors?.billing_first_name[0],
            });
          }
          if (error?.response?.data?.errors?.billing_last_name) {
            setError("billing_last_name", {
              type: "server",
              message: error?.response?.data?.errors?.billing_last_name[0],
            });
          }
          if (error?.response?.data?.errors?.billing_email) {
            setError("billing_email", {
              type: "server",
              message: error?.response?.data?.errors?.billing_email[0],
            });
          }
          if (error?.response?.data?.errors?.billing_phone) {
            setError("billing_phone", {
              type: "server",
              message: error?.response?.data?.errors?.billing_phone[0],
            });
          }
          if (error?.response?.data?.errors?.billing_country) {
            setError("billing_country", {
              type: "server",
              message: error?.response?.data?.errors?.billing_country[0],
            });
          }
          if (error?.response?.data?.errors?.billing_state) {
            setError("billing_state", {
              type: "server",
              message: error?.response?.data?.errors?.billing_state[0],
            });
          }
          if (error?.response?.data?.errors?.billing_city) {
            setError("billing_city", {
              type: "server",
              message: error?.response?.data?.errors?.billing_city[0],
            });
          }
          if (error?.response?.data?.errors?.billing_pin) {
            setError("billing_pin", {
              type: "server",
              message: error?.response?.data?.errors?.billing_pin[0],
            });
          }
          if (error?.response?.data?.errors?.billing_address_1) {
            setError("billing_address_1", {
              type: "server",
              message: error?.response?.data?.errors?.billing_address_1[0],
            });
          }
          if (error?.response?.data?.errors?.mode_of_payment) {
            setError("mode_of_payment", {
              type: "server",
              message: error?.response?.data?.errors?.mode_of_payment[0],
            });
          }
        } finally {
          setLoadingCheckout(false);
        }
      };

    return (
        <IonModal isOpen={isOpen} onDidDismiss={()=>setIsOpen(false)} initialBreakpoint={1} breakpoints={[0, 1]} className='login-modal-main'>
          <div className='page-padding mb-2 mt-1'>
              <div className="content-main mt-1">
                  <h6>Billing Information</h6>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                  <IonList className="ion-no-padding">
                  {fields.map((item, i) => (
                      <Input
                      {...item}
                      register={register}
                      errors={errors}
                      key={i}
                      />
                  ))}
                  </IonList>
                  <IonList className="ion-no-padding">
                      <>
                          <IonItem className="ion-no-padding auth-card-background">
                              <IonTextarea 
                                  className="ion-no-padding" 
                                  labelPlacement="floating" 
                                  placeholder='Enter address'
                                  label='Address'
                                  inputmode="text"
                                  {...register('billing_address_1')}
                              >
                              </IonTextarea>
                          </IonItem>
                          <ErrorMessage
                              errors={errors}
                              name='billing_address_1'
                              as={<div style={{ color: 'red' }} />}
                          />
                      </>
                  </IonList>
                  <IonList className="ion-no-padding">
                      <IonItem className='ps-0'>
                          <IonSelect aria-label="Payment Mode" interface="popover" label="Select payment mode" placeholder="Select payment mode" labelPlacement="floating" className="ion-no-padding" {...register('mode_of_payment')}>
                              <IonSelectOption value="Cash On Delivery">Cash On Delivery</IonSelectOption>
                              <IonSelectOption value="Online">Online</IonSelectOption>
                          </IonSelect>
                      </IonItem>
                      <ErrorMessage
                          errors={errors}
                          name='mode_of_payment'
                          as={<div style={{ color: 'red' }} />}
                      />
                  </IonList>
                  <div className='text-center'>
                      <IonButton
                          color="success"
                          type="submit"
                          size='small'
                          className="mt-1 login-button"
                      >
                          {loadingCheckout ? (
                              <IonSpinner name="crescent"></IonSpinner>
                          ) : (
                              "Place Order"
                          )}
                      </IonButton>
                  </div>
              </form>
          </div>
        </IonModal>
    );
};

export default CheckoutModal;
