import { ErrorMessage } from "@hookform/error-message";
import { IonButton, IonIcon, IonInput, IonItem } from "@ionic/react";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
    errors : FieldErrors<any>,
    register: UseFormRegister<any>,
    inputmode: any,
    label: string,
    type: any,
    name: any,
    placeholder: string,
};

const Input: React.FC<Props> = ({errors, register, label, type, name, placeholder, inputmode}) => {
    const [passwordType, setPasswordType] = useState<boolean>(true);
    if(type==='password'){
        return (
            <>
                <IonItem className="ion-no-padding auth-card-background">
                    <IonInput 
                        className="ion-no-padding" 
                        label={label} 
                        type={passwordType ? 'password':'text'}
                        inputmode={inputmode}
                        labelPlacement="floating" 
                        placeholder={placeholder}
                        {...register(name)}
                        style={{flex: 1}}
                    >
                    </IonInput>
                    <IonButton className="m-0 fs-1" fill='clear' color="success" onClick={()=>setPasswordType(prevType => !prevType)}>
                        <IonIcon icon={passwordType ? eyeOutline : eyeOffOutline}></IonIcon>
                    </IonButton>
                </IonItem>
                <ErrorMessage
                    errors={errors}
                    name={name}
                    as={<div style={{ color: 'red' }} />}
                />
            </>
        );
    }
    
    return (
        <>
            <IonItem className="ion-no-padding auth-card-background">
                <IonInput 
                    className="ion-no-padding" 
                    label={label} 
                    type={type}
                    inputmode={inputmode}
                    labelPlacement="floating" 
                    placeholder={placeholder}
                    {...register(name)}
                >
                </IonInput>
            </IonItem>
            <ErrorMessage
                errors={errors}
                name={name}
                as={<div style={{ color: 'red' }} />}
            />
        </>
    );
}

export default Input;