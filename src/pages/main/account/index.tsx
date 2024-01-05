import {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonLabel,
    IonIcon,
    IonSpinner,
    IonItemDivider,
    IonRow,
    IonCol,
    IonButton,
} from "@ionic/react";
import { bagCheckOutline, bookmarkOutline, cogOutline, imageOutline, logOutOutline, mailUnreadOutline, newspaperOutline } from "ionicons/icons";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import { axiosPublic } from "../../../../axios";
import { api_routes } from "../../../helper/routes";
import { useToast } from "../../../hooks/useToast";
import { Browser } from "@capacitor/browser";

const legal_pages = [
    {
        name: 'Shipping Policy',
        link: 'https://jap.bio/shipping-policy'
    },
    {
        name: 'Terms & Conditions',
        link: 'https://jap.bio/terms-conditions'
    },
    {
        name: 'Privacy Policy',
        link: 'https://jap.bio/privacy-policy'
    },
    {
        name: 'Return & Refund Policy',
        link: 'https://jap.bio/return-refund'
    },
];

const Account: React.FC = () => {

    const {logout} = useContext(AuthContext);
    const {toastError, toastSuccess} = useToast();
    const [loading, setLoading] = useState<boolean>(false);

    const logoutHandler = async() => {
        setLoading(true);
        try {
          await axiosPublic.post(api_routes.logout, {});
          logout();
          toastSuccess('Logged out successfully.');
        } catch (error: any) {
          toastError('Something went wrong. Please try again later!');
        }finally {
            setLoading(false);
        }
    }
    const loadPage = async(url:string) =>{
        await Browser.open({ url });
    }
    return (
        <IonPage>
            <IonHeader translucent={true} className='main-header-background'>
                <IonToolbar className='main-header-background'> 
                    <IonTitle className="text-center">Account</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen={false} forceOverscroll={false}>
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
                <Link className="no-underline" to="/b2b-enquiry">
                    <IonItem lines="full" detail={true}>
                        <IonLabel>B2B Enquiry</IonLabel>
                        <IonIcon icon={mailUnreadOutline} slot="start"></IonIcon>
                    </IonItem>
                </Link>
                <IonItem lines="full" detail={true} onClick={()=>loadPage('https://jap.bio/gallery')}>
                        <IonLabel>Gallery</IonLabel>
                        <IonIcon icon={imageOutline} slot="start"></IonIcon>
                </IonItem>
                {
                    legal_pages.map((item, i) => <IonItem lines="full" detail={true} onClick={()=>loadPage(item.link)} key={i}>
                        <IonLabel>{item.name}</IonLabel>
                        <IonIcon icon={newspaperOutline} slot="start"></IonIcon>
                    </IonItem>)
                }
                
                <IonItemDivider className="cart-checkout-btn-main-container page-padding" slot="fixed">
                      <IonRow className="ion-align-items-center ion-justify-content-center p-0 w-100">
                          <IonCol
                              size="12"
                              className='text-right'
                          >
                              <IonButton className="pagination-btn m-0" fill='solid' color="danger" onClick={logoutHandler} disabled={loading}>
                                {loading ? (
                                    <IonSpinner name="crescent" color='light'></IonSpinner>
                                ) : (
                                    <>
                                        <IonIcon icon={logOutOutline} slot="start"></IonIcon>
                                        Logout
                                    </>
                                )}
                              </IonButton>
                          </IonCol>
                      </IonRow>
                  </IonItemDivider>
            </IonContent>
        </IonPage>
    );
};

export default Account;
