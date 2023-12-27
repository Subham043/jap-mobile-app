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
} from "@ionic/react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../../components/Input";
import { axiosPublic } from "../../../../axios";
import { api_routes } from "../../../helper/routes";
import { useState } from "react";
import Auth from "../../../layout/Auth";
import { useToast } from "../../../hooks/useToast";

const fields = [
  {
    placeholder: "Enter email",
    label: "Email",
    type: "email",
    name: "email",
    inputmode: "email",
  },
];

const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

const ForgotPassword: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const {toastError, toastSuccess} = useToast();

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

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await axiosPublic.post(api_routes.forgot_password, data);
      toastSuccess(response.data.message);
      reset({
        email: "",
      });
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        toastError(error?.response?.data?.message);
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
          <IonButton fill='clear' className="no-underline text-center w-100 p-0" onClick={()=>history.goBack()}>
              <IonText color="dark">
                  <p className="fs-1-5 text-center">
                  <b>Remember your password?</b>
                  </p>
              </IonText>
          </IonButton>
        </IonCardContent>
    </Auth>
              
  );
};

export default ForgotPassword;
