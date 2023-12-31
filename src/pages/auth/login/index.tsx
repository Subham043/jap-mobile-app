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
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../../components/Input";
import { axiosPublic } from "../../../../axios";
import { api_routes } from "../../../helper/routes";
import { useContext, useState } from "react";
import Auth from "../../../layout/Auth";
import { AuthContext } from "../../../context/AuthProvider";
import { useToast } from "../../../hooks/useToast";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

  const fields = [
    {
      placeholder: "Enter email",
      label: "Email",
      type: "email",
      name: "email",
      inputmode: "email",
    },
    {
      placeholder: "Enter password",
      label: "Password",
      type: "password",
      name: "password",
      inputmode: "text",
    },
  ];

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const {setAuth} = useContext(AuthContext);
  const {toastError, toastSuccess} = useToast();

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
    setLoading(true);
    try {
      const response = await axiosPublic.post(api_routes.login, data);
      toastSuccess(response.data.message);
      reset({
        email: "",
        password: "",
      });
      setAuth({auth:{
        authenticated: true,
        token: response.data.token,
        token_type: response.data.token_type,
        user: response.data.user
      }})
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toastError(error?.response?.data?.message);
      }
      if (error?.response?.data?.errors?.email) {
        setError("email", {
          type: "server",
          message: error?.response?.data?.errors?.email[0],
        });
      }
      if (error?.response?.data?.errors?.password) {
        setError("password", {
          type: "server",
          message: error?.response?.data?.errors?.password[0],
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
            <h3>LOGIN</h3>
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
                "Login"
            )}
            </IonButton>
        </form>
        <IonGrid className="mt-1">
            <IonRow className="ion-align-items-center ion-justify-content-between">
            <IonCol size="6">
                <Link className="no-underline" to="/register">
                <IonText color="dark">
                    <p className="fs-1-5 text-left">
                    <b>Register</b>
                    </p>
                </IonText>
                </Link>
            </IonCol>
            <IonCol size="6">
                <Link className="no-underline" to="/forgot_password">
                <IonText color="dark">
                    <p className="fs-1-5 text-right">
                    <b>Forgot Password?</b>
                    </p>
                </IonText>
                </Link>
            </IonCol>
            </IonRow>
        </IonGrid>
        </IonCardContent>
    </Auth>
  );
};

export default Login;
