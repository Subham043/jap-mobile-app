import {
  IonCardHeader,
  IonButton,
  IonText,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonSpinner,
  IonToast,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../../components/Input";
import { axiosPublic } from "../../../../axios";
import { api_routes } from "../../../helper/routes";
import { useState } from "react";
import Auth from "../../../layout/Auth";

const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    register,
    getValues,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fields = [
    {
      placeholder: "Enter email",
      label: "Email",
      type: "email",
      name: "email",
      inputmode: "email",
    },
  ];

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await axiosPublic.post(api_routes.forgot_password, data);
      setResponseMessage(response.data.message);
      setIsToastOpen(true);
      reset({
        email: "",
      });
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        setResponseMessage(error?.response?.data?.message);
        setIsToastOpen(true);
      }
      if (error?.response?.data?.errors?.email) {
        setError("email", {
          type: "server",
          message: error?.response?.data?.errors?.email[0],
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Auth>
        <IonCardHeader>
        <IonText
            color="success"
            className="text-center text-capitalize"
        >
            <p>
            Enter your email and instructions will be sent to you!
            </p>
        </IonText>
        </IonCardHeader>

        <IonCardContent>
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
            <IonButton
            color="success"
            type="submit"
            expand="full"
            shape="round"
            className="mt-2"
            >
            {loading ? (
                <IonSpinner name="crescent"></IonSpinner>
            ) : (
                "Reset Password"
            )}
            </IonButton>
        </form>
        <IonGrid className="mt-1">
            <IonRow className="ion-align-items-center ion-justify-content-between">
            <IonCol size="12">
                <Link className="no-underline" to="/login">
                <IonText color="dark">
                    <p className="fs-1-5 text-center">
                    <b>Remember your password?</b>
                    </p>
                </IonText>
                </Link>
            </IonCol>
            </IonRow>
        </IonGrid>
        <IonToast
            isOpen={isToastOpen}
            message={responseMessage}
            onDidDismiss={() => setIsToastOpen(false)}
            duration={5000}
            buttons={[
            {
                text: "Close",
                handler: () => {
                setIsToastOpen(false);
                },
            },
            ]}
            layout="stacked"
        ></IonToast>
        </IonCardContent>
    </Auth>
              
  );
};

export default ForgotPassword;
