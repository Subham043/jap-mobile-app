import {
    IonButton,
    IonList,
    IonSpinner,
} from "@ionic/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from '../Input';
import { useState } from "react";
import { useToast } from "../../hooks/useToast";
import { axiosPublic } from "../../../axios";
import { api_routes } from "../../helper/routes";

const fields = [
  {
    placeholder: "Enter old password",
    label: "Old Password",
    type: "password",
    name: "old_password",
    inputmode: "text",
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

const schema = yup
  .object({
    old_password: yup.string().required(),
    password: yup.string().required(),
    confirm_password: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();

const Setting: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const {toastSuccess, toastError} = useToast();

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
          const response = await axiosPublic.post(api_routes.password_update, data);
          toastSuccess(response.data.message);
          reset({
            old_password: "",
            password: "",
            confirm_password: "",
          });
        } catch (error: any) {
          console.log(error);
          if (error?.response?.data?.message) {
            toastError(error?.response?.data?.message);
          }
          if (error?.response?.data?.errors?.old_password) {
            setError("old_password", {
              type: "server",
              message: error?.response?.data?.errors?.old_password[0],
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
    );
};

export default Setting;
