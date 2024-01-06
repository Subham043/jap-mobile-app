import {
    IonPage,
    IonContent,
    IonButton,
    IonList,
    IonSpinner,
    IonItem,
    IonIcon,
    IonLabel,
    IonTextarea,
} from "@ionic/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { callOutline, mailOutline, locationOutline } from "ionicons/icons";
import { ErrorMessage } from "@hookform/error-message";
import BackHeader from "../../../components/BackHeader";
import { api_routes } from "../../../helper/routes";
import { useToast } from "../../../hooks/useToast";
import { axiosPublic } from "../../../../axios";
import { AuthContext } from "../../../context/AuthProvider";
import Input from "../../../components/Input";

const fields = [
    {
      placeholder: "Enter name",
      label: "Name",
      type: "text",
      name: "name",
      inputmode: "text",
    },
    {
      placeholder: "Enter email",
      label: "Email",
      type: "email",
      name: "email",
      inputmode: "email",
    },
    {
        placeholder: "Enter phone",
        label: "Phone",
        type: "text",
        name: "phone",
        inputmode: "numeric",
    },
];

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    message: yup.string().required(),
    phone: yup
      .string()
      .required()
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
  })
  .required();

const Contact: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const {auth} = useContext(AuthContext);
    const {toastSuccess, toastError} = useToast();

    const {
        handleSubmit,
        register,
        getValues,
        reset,
        setError,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
        values: {
          name: auth.user ? auth.user.name : '',
          email: auth.user ? auth.user.email : '',
          phone: auth.user ? auth.user.phone : '',
          message: '',
        }
      });
      

      const onSubmit = async () => {
        setLoading(true);
        try {
          const response = await axiosPublic.post(api_routes.contact, {...getValues()});
          toastSuccess(response.data.message);
          reset({
            message: '',
          })
        } catch (error: any) {
          console.log(error);
          if (error?.response?.data?.message) {
            toastError(error?.response?.data?.message);
          }
          if (error?.response?.data?.errors?.name) {
            setError("name", {
              type: "server",
              message: error?.response?.data?.errors?.name[0],
            });
          }
          if (error?.response?.data?.errors?.email) {
            setError("email", {
              type: "server",
              message: error?.response?.data?.errors?.email[0],
            });
          }
          if (error?.response?.data?.errors?.phone) {
            setError("phone", {
              type: "server",
              message: error?.response?.data?.errors?.phone[0],
            });
          }
          if (error?.response?.data?.errors?.message) {
            setError("message", {
              type: "server",
              message: error?.response?.data?.errors?.message[0],
            });
          }
        } finally {
          setLoading(false);
        }
      };
      

    return (
        <IonPage>
            <BackHeader title='Contact Us' link='/account' />
            <IonContent fullscreen={false} forceOverscroll={false}>
              <div className="page-padding mt-1">
                <div className="product-detail-main-specification">
                    <div className="product-detail-main-content-heading">
                        <h6>Contact Information</h6>
                    </div>

                    <div>
                      <IonItem lines="inset">
                          <IonIcon icon={mailOutline} slot="start" className='order-detail-billing-icon'></IonIcon>
                          <IonLabel>
                              <p className='order-detail-personal-info'>operations@jap.bio</p>
                          </IonLabel>
                      </IonItem>
                      <IonItem lines="inset">
                          <IonIcon icon={callOutline} slot="start" className='order-detail-billing-icon'></IonIcon>
                          <IonLabel>
                              <p className='order-detail-personal-info'>+91-9207300055</p>
                          </IonLabel>
                      </IonItem>
                      <IonItem lines="inset">
                          <IonIcon icon={locationOutline} slot="start" className='order-detail-billing-icon'></IonIcon>
                          <IonLabel className="ion-text-wrap">
                              <p className='order-detail-personal-info'>2, OVH ROAD, BASAVANAGUDI, BENGALURU, Pin - 560004</p>
                          </IonLabel>
                      </IonItem>
                    </div>
                </div>
                <div className="product-detail-main-specification">
                    <div className="product-detail-main-content-heading">
                        <h6>Get In Touch</h6>
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
                                <IonItem className="ion-no-padding">
                                    <IonTextarea
                                        className="ion-no-padding main-input"
                                        labelPlacement="floating"
                                        placeholder='Enter message'
                                        label='Message'
                                        inputmode="text"
                                        {...register('message')}
                                    >
                                    </IonTextarea>
                                </IonItem>
                                <ErrorMessage
                                    errors={errors}
                                    name='message'
                                    as={<div style={{ color: 'red' }} />}
                                />
                            </>
                        </IonList>
                        <div className='text-center'>
                            <IonButton
                                color="success"
                                type="submit"
                                size='small'
                                className="mt-1 login-button"
                            >
                                {loading ? (
                                    <IonSpinner name="crescent"></IonSpinner>
                                ) : (
                                    "Submit"
                                )}
                            </IonButton>
                        </div>
                    </form>
                </div>
              </div>
            </IonContent>
        </IonPage>
    );
};

export default Contact;
