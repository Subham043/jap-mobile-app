import {
    IonPage,
    IonContent,
    IonCard,
    IonButton,
    IonList,
    IonSpinner,
    IonCardContent,
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
    {
        placeholder: "Enter company name",
        label: "Company Name",
        type: "text",
        name: "company_name",
        inputmode: "text",
    },
    {
        placeholder: "Enter company website",
        label: "Company Website",
        type: "text",
        name: "company_website",
        inputmode: "text",
    },
    {
        placeholder: "Enter designation",
        label: "Designation",
        type: "text",
        name: "designation",
        inputmode: "text",
    },
    {
        placeholder: "Enter product",
        label: "Product",
        type: "text",
        name: "product",
        inputmode: "text",
    },
    {
        placeholder: "Enter quantity",
        label: "Quantity",
        type: "text",
        name: "quantity",
        inputmode: "text",
    },
    {
        placeholder: "Enter gst",
        label: "GST",
        type: "text",
        name: "gst",
        inputmode: "text",
    },
    {
        placeholder: "Enter certification",
        label: "Certification",
        type: "text",
        name: "certification",
        inputmode: "text",
    },
    {
        placeholder: "Enter alternate name",
        label: "Alternate Name",
        type: "text",
        name: "alternate_name",
        inputmode: "text",
    },
    {
        placeholder: "Enter alternate email",
        label: "Alternate Email",
        type: "email",
        name: "alternate_email",
        inputmode: "email",
    },
    {
        placeholder: "Enter alternate phone",
        label: "Alternate Phone",
        type: "text",
        name: "alternate_phone",
        inputmode: "numeric",
    },
];

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    address: yup.string().required(),
    company_name: yup.string().required(),
    company_website: yup.string().required(),
    designation: yup.string().required(),
    product: yup.string().required(),
    quantity: yup.string().required(),
    gst: yup.string().required(),
    certification: yup.string().required(),
    message: yup.string(),
    alternate_name: yup.string(),
    alternate_email: yup.string().email(),
    phone: yup
      .string()
      .required()
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
    alternate_phone: yup
      .string()
      .max(10, "Must be exactly 10 digits"),
  })
  .required();

const B2B: React.FC = () => {

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
          address: '',
          company_name: '',
          company_website: '',
          designation: '',
          product: '',
          quantity: '',
          gst: '',
          certification: '',
          alternate_name: '',
          alternate_phone: '',
          alternate_email: '',
        }
      });
      

      const onSubmit = async () => {
        setLoading(true);
        try {
          const response = await axiosPublic.post(api_routes.enquiry, {...getValues()});
          toastSuccess(response.data.message);
          reset({
            message: '',
            address: '',
            company_name: '',
            company_website: '',
            designation: '',
            product: '',
            quantity: '',
            gst: '',
            certification: '',
            alternate_name: '',
            alternate_phone: '',
            alternate_email: '',
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
          if (error?.response?.data?.errors?.alternate_name) {
            setError("alternate_name", {
              type: "server",
              message: error?.response?.data?.errors?.alternate_name[0],
            });
          }
          if (error?.response?.data?.errors?.alternate_email) {
            setError("alternate_email", {
              type: "server",
              message: error?.response?.data?.errors?.alternate_email[0],
            });
          }
          if (error?.response?.data?.errors?.alternate_phone) {
            setError("alternate_phone", {
              type: "server",
              message: error?.response?.data?.errors?.alternate_phone[0],
            });
          }
          if (error?.response?.data?.errors?.message) {
            setError("message", {
              type: "server",
              message: error?.response?.data?.errors?.message[0],
            });
          }
          if (error?.response?.data?.errors?.address) {
            setError("address", {
              type: "server",
              message: error?.response?.data?.errors?.address[0],
            });
          }
          if (error?.response?.data?.errors?.company_name) {
            setError("company_name", {
              type: "server",
              message: error?.response?.data?.errors?.company_name[0],
            });
          }
          if (error?.response?.data?.errors?.company_website) {
            setError("company_website", {
              type: "server",
              message: error?.response?.data?.errors?.company_website[0],
            });
          }
          if (error?.response?.data?.errors?.designation) {
            setError("designation", {
              type: "server",
              message: error?.response?.data?.errors?.designation[0],
            });
          }
          if (error?.response?.data?.errors?.product) {
            setError("product", {
              type: "server",
              message: error?.response?.data?.errors?.product[0],
            });
          }
          if (error?.response?.data?.errors?.quantity) {
            setError("quantity", {
              type: "server",
              message: error?.response?.data?.errors?.quantity[0],
            });
          }
          if (error?.response?.data?.errors?.gst) {
            setError("gst", {
              type: "server",
              message: error?.response?.data?.errors?.gst[0],
            });
          }
          if (error?.response?.data?.errors?.certification) {
            setError("certification", {
              type: "server",
              message: error?.response?.data?.errors?.certification[0],
            });
          }
        } finally {
          setLoading(false);
        }
      };
      

    return (
        <IonPage>
            <BackHeader title='B2B Enquiry' link='/account' />
            <IonContent fullscreen={false} forceOverscroll={false}>
                <IonCard>
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
                </IonCard>
                <IonCard>
                    <div className='ion-padding pt-0 pb-0'>
                        <div className="content-main mt-1">
                            <h6>Drop Your Thoughts</h6>
                        </div>
                    </div>
                    <IonCardContent className="pt-0">
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
                                            placeholder='Enter address'
                                            label='Address'
                                            inputmode="text"
                                            {...register('address')}
                                        >
                                        </IonTextarea>
                                    </IonItem>
                                    <ErrorMessage
                                        errors={errors}
                                        name='address'
                                        as={<div style={{ color: 'red' }} />}
                                    />
                                </>
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
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default B2B;
