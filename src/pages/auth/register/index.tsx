import {
  IonCardHeader,
  IonButton,
  IonText,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonToast,
  IonSpinner,
} from "@ionic/react";
import { isPlatform } from '@ionic/react';
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
    name: yup.string().required(),
    phone: yup
      .string()
      .required()
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirm_password: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();

const Register: React.FC = () => {
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
      placeholder: "Enter password",
      label: "Password",
      type: "password",
      name: "password",
      inputmode: "text",
    },
    {
      placeholder: "Enter confirm password",
      label: "Confirm Password",
      type: "password",
      name: "confirm_password",
      inputmode: "text",
    },
  ];

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await axiosPublic.post(api_routes.register, data);
      setResponseMessage(response.data.message);
      setIsToastOpen(true);
      reset({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirm_password: "",
      });
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        setResponseMessage(error?.response?.data?.message);
        setIsToastOpen(true);
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
      if (error?.response?.data?.errors?.password) {
        setError("password", {
          type: "server",
          message: error?.response?.data?.errors?.password[0],
        });
      }
      if (error?.response?.data?.errors?.confirm_password) {
        setError("confirm_password", {
          type: "server",
          message: error?.response?.data?.errors?.confirm_password[0],
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Auth>
        <IonCardHeader>
        <IonText color="success" className="text-center">
            <h3>REGISTRATION</h3>
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
                "Register"
            )}
            </IonButton>
        </form>
        <IonGrid className="mt-1">
            <IonRow className="ion-align-items-center ion-justify-content-between">
            <IonCol size="12">
                <Link className="no-underline" to="/login">
                <IonText color="dark">
                    <p className="fs-1-5 text-center">
                    <b>Already have an account?</b>
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

export default Register;
