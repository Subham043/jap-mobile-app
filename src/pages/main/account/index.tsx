import {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonLabel,
    IonIcon,
    IonToast,
    IonSpinner,
} from "@ionic/react";
import { bagCheckOutline, bookmarkOutline, cogOutline, logOutOutline, personCircleOutline } from "ionicons/icons";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import { axiosPublic } from "../../../../axios";
import { api_routes } from "../../../helper/routes";


const Account: React.FC = () => {

    const {auth, logout} = useContext(AuthContext);
    const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const logoutHandler = async() => {
        setLoading(true);
        try {
          await axiosPublic.post(api_routes.logout, {}, {
            headers: {"Authorization" : `Bearer ${auth.token}`}
          });
          logout();
          setResponseMessage('Logged out successfully.');
          setIsToastOpen(true);
        } catch (error: any) {
          console.log(error);
          setResponseMessage('Something went wrong. Please try again later!');
          setIsToastOpen(true);
        }finally {
            setLoading(false);
        }
    }
    return (
        <IonPage>
            <IonHeader translucent={true} className='main-header-background'>
                <IonToolbar className='main-header-background'> 
                    <IonTitle className="text-center">Account</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen={false} forceOverscroll={false}>
                <Link className="no-underline" to="/profile">
                    <IonItem lines="full" detail={true}>
                        <IonLabel>Profile</IonLabel>
                        <IonIcon icon={personCircleOutline} slot="start"></IonIcon>
                    </IonItem>
                </Link>
                <Link className="no-underline" to="/setting">
                    <IonItem lines="full" detail={true}>
                        <IonLabel>Setting</IonLabel>
                        <IonIcon icon={cogOutline} slot="start"></IonIcon>
                    </IonItem>
                </Link>
                <Link className="no-underline" to="/wishlist">
                    <IonItem lines="full" detail={true}>
                        <IonLabel>Wishlist</IonLabel>
                        <IonIcon icon={bookmarkOutline} slot="start"></IonIcon>
                    </IonItem>
                </Link>
                <Link className="no-underline" to="/orders">
                    <IonItem lines="full" detail={true}>
                        <IonLabel>Orders</IonLabel>
                        <IonIcon icon={bagCheckOutline} slot="start"></IonIcon>
                    </IonItem>
                </Link>
                {loading ? (
                    <IonItem lines="full" detail={true}>
                        <IonSpinner name="crescent" color={'success'}></IonSpinner>
                    </IonItem>
                ) : (
                    <IonItem lines="full" detail={true} onClick={logoutHandler}>
                        <IonLabel>Logout</IonLabel>
                        <IonIcon icon={logOutOutline} slot="start"></IonIcon>
                    </IonItem>
                )}
                
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

            </IonContent>
        </IonPage>
    );
};

export default Account;
