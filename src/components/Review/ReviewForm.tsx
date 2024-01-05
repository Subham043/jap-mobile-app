import { ErrorMessage } from "@hookform/error-message";
import { IonButton, IonCard, IonItem, IonLabel, IonList, IonModal, IonSelect, IonSelectOption, IonSpinner, IonTextarea } from "@ionic/react";
import Input from "../Input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosPublic } from "../../../axios";
import { api_routes } from "../../helper/routes";
import { useState } from "react";
import { useToast } from "../../hooks/useToast";

type Props = {
    product_id: number;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

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
];

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    message: yup.string().required(),
    star: yup.string().required(),
    image: yup.mixed().required('An image is required')
    .test('fileRequired', 'Please select an image', (value:any) => {
      return value && value.length>0;
    })
    .test('fileFormat', 'Please select a valid image', (value:any) => {
      return value && value.length>0 && ['image/webp', 'image/png', 'image/jpeg', 'image/jpg'].includes(value[0].type);
    }),
  })
  .required();

const ReviewForm: React.FC<Props> = ({product_id, isOpen, setIsOpen}) => {
    const {toastError, toastSuccess} = useToast();
    const [loading, setLoading] = useState<boolean>(false);

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
            const formData = new FormData;
            formData.append('email', data.email);
            formData.append('image', data.image[0]);
            formData.append('message', data.message);
            formData.append('name', data.name);
            formData.append('star', data.star);
          const response = await axiosPublic.post(api_routes.rating+`/${product_id}/create`, formData);
          toastSuccess(response.data.message);
          reset({
            name: "",
            message: "",
            email: "",
            star: "",
            image: ""
          });
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
          if (error?.response?.data?.errors?.star) {
            setError("star", {
              type: "server",
              message: error?.response?.data?.errors?.star[0],
            });
          }
          if (error?.response?.data?.errors?.image) {
            setError("image", {
              type: "server",
              message: error?.response?.data?.errors?.image[0],
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
        <IonModal isOpen={isOpen} onDidDismiss={()=>setIsOpen(false)} initialBreakpoint={1} breakpoints={[0, 1]} className='login-modal-main'>
            <div className='page-padding mb-2 mt-1'>
                <div className="content-main mt-1">
                    <h6>Add Review</h6>
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
                        <IonItem className='ps-0'>
                            <IonSelect aria-label="Rating" interface="popover" label="Select rating" placeholder="Select rating" labelPlacement="floating" className="ion-no-padding" color='success' {...register('star')}>
                                <IonSelectOption value="5">5 stars</IonSelectOption>
                                <IonSelectOption value="4">4 stars</IonSelectOption>
                                <IonSelectOption value="3">3 stars</IonSelectOption>
                                <IonSelectOption value="2">2 stars</IonSelectOption>
                                <IonSelectOption value="1">1 star</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <ErrorMessage
                            errors={errors}
                            name='star'
                            as={<div style={{ color: 'red' }} />}
                        />
                    </IonList>
                    <IonList className="ion-no-padding">
                        <>
                            <IonItem className="ion-no-padding auth-card-background">
                                <IonTextarea
                                    className="ion-no-padding"
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
                    <IonList className="ion-no-padding">
                        <>
                            <br/>
                            <IonLabel>Image</IonLabel>
                            <IonItem className="ion-no-padding auth-card-background">
                                <input type="file" className="mt-1" {...register('image')} />
                            </IonItem>
                            <ErrorMessage
                                errors={errors}
                                name='image'
                                as={<div style={{ color: 'red' }} />}
                            />
                        </>
                    </IonList>
                    <div className='text-center'>
                      <IonButton
                          color="success"
                          type="submit"
                          size="small"
                          mode="md"
                          className="mt-2 login-btn"
                      >
                          {loading ? (
                              <IonSpinner name="crescent" color={'light'}></IonSpinner>
                          ) : (
                              "Submit"
                          )}
                      </IonButton>
                    </div>
                </form>
            </div>
        </IonModal>
    );
}

export default ReviewForm;