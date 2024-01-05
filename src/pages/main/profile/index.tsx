import {
    IonPage,
    IonContent,
    IonCard,
    IonButton,
    IonList,
    IonSpinner,
} from "@ionic/react";
import BackHeader from "../../../components/BackHeader";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from '../../../components/Input';
import { axiosPublic } from "../../../../axios";
import { api_routes } from "../../../helper/routes";
import { useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import { useToast } from "../../../hooks/useToast";

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
    phone: yup
      .string()
      .required()
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
  })
  .required();

const Profile: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const {auth} = useAuth();
    const {toastSuccess, toastError} = useToast();

    const {
        handleSubmit,
        register,
        setError,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
        values:{
          'email': auth.user ? auth.user.email : '',
          'name': auth.user ? auth.user.name : '',
          'phone': auth.user ? auth.user.phone : ''
        }
      });
      

      const onSubmit = async (data: any) => {
        setLoading(true);
        try {
          const response = await axiosPublic.post(api_routes.profile_update, data);
          toastSuccess(response.data.message);
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
        } finally {
          setLoading(false);
        }
      };
      

    return (
        <IonPage>
            <BackHeader title='Profile' link='/account' />
            <IonContent fullscreen={false} forceOverscroll={false}>
                <IonCard className="final-table mt-2">
                    <div className='ion-padding pt-0 pb-0'>
                        <div className="content-main mt-1">
                            <h6>Profile Information</h6>
                        </div>
                    </div>
                    <div className='ion-padding mb-1'>
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
                                        "UPDATE"
                                    )}
                                </IonButton>
                            </div>
                        </form>
                    </div>
                    
                </IonCard>

            </IonContent>
        </IonPage>
    );
};

export default Profile;
