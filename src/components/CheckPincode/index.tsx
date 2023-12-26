import { IonButton, IonCol, IonIcon, IonRow, IonInput, IonItem, IonCard, IonSpinner } from '@ionic/react';
import { useState } from 'react';
import { informationCircleOutline } from 'ionicons/icons';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from '@hookform/error-message';
import { axiosPublic } from '../../../axios';
import { api_routes } from '../../helper/routes';

const pincodeSchema = yup
  .object({
    pincode: yup.string().required(),
  })
  .required();

const CheckPincode: React.FC<{
    slug: string;
}> = ({slug}) => {

  const [loadingPincode, setLoadingPincode] = useState<boolean>(false);

  const [pincodeResponseMessage, setPincodeResponseMessage] = useState<{
    message: string,
    status: 'success'|'error'
  }>({
    message: '',
    status: 'error'
  });

  const pincodeForm = useForm({
    resolver: yupResolver(pincodeSchema),
  });

  const onPincodeSubmitHandler = async (data: any) => {
    setLoadingPincode(true);
    setPincodeResponseMessage({
        message: '',
        status: 'error'
    });
    try {
      await axiosPublic.post(api_routes.pincode+`/${slug}`, data);
        setPincodeResponseMessage({
            message: data.pincode,
            status: 'success'
        });
      pincodeForm.reset({
        pincode: "",
      });
    } catch (error: any) {
      if (error?.response?.data?.message && !error?.response?.data?.availability) {
        setPincodeResponseMessage({
            message: error?.response?.data?.message,
            status: 'error'
        });
      }
      if (error?.response?.data?.errors?.pincode) {
        pincodeForm.setError("pincode", {
          type: "server",
          message: error?.response?.data?.errors?.pincode[0],
        });
      }
    } finally {
      setLoadingPincode(false);
    }
  };


    return (
        <IonCard className="final-table mt-2">
            <div className='ion-padding pt-0 pb-0'>
                <div className="content-main mt-1">
                    <h6>Check Availability</h6>
                </div>
            </div>
            <div className='ion-padding'>
                <form onSubmit={pincodeForm.handleSubmit(onPincodeSubmitHandler)}>    
                    <IonRow className="ion-align-items-center ion-justify-content-between p-0 w-100">
                        <IonCol
                            size="9"
                            className='text-left'
                        >
                            <IonItem>
                                <IonInput
                                className="coupon-code-input-holder"
                                clearInput={true}
                                type="text"
                                inputmode="text"
                                placeholder="Enter Pincode"
                                {...pincodeForm.register('pincode')}
                                ></IonInput>
                            </IonItem>
                            <ErrorMessage
                                errors={pincodeForm.formState.errors}
                                name={'pincode'}
                                as={<div style={{ color: 'red' }} />}
                            />
                        </IonCol>
                        <IonCol
                            size="3"
                            className='text-right'
                        >
                            <IonButton className="m-0" type='submit' size="small" fill='outline' color="success">
                            {loadingPincode ? (
                                <IonSpinner name="crescent" color={'success'}></IonSpinner>
                            ) : (
                                "CHECK"
                            )}
                            </IonButton>
                        </IonCol>
                        {pincodeResponseMessage.message.length>0 && <IonCol
                            size="12"
                            className='text-center'
                        >
                            {pincodeResponseMessage.status=='error' ? 
                                <p className={`text-${pincodeResponseMessage.status} mb-0 d-flex ion-align-items-center ion-justify-content-center`}><IonIcon slot="start" className={`info-icon-green`} icon={informationCircleOutline}></IonIcon> {pincodeResponseMessage.message}</p> :
                                <p className={`text-${pincodeResponseMessage.status} mb-0 d-flex ion-align-items-center ion-justify-content-center`}><IonIcon slot="start" className={`info-icon-green`} icon={informationCircleOutline}></IonIcon> Product available for pincode : <b>{pincodeResponseMessage.message}</b></p>
                            }
                        </IonCol>}
                    </IonRow>
                </form>
            </div>
        </IonCard>
    );
  };
  
export default CheckPincode;