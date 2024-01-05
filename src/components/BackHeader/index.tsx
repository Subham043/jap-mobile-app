import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from "@ionic/react";

type Props = {
    title: string,
    link: string,
};

const BackHeader: React.FC<Props> = ({title, link}) => {
    return (
        <IonHeader>
            <IonToolbar mode="ios" className='main-header-background'>
              <IonButtons slot="start">
                <IonBackButton defaultHref={link} color='success'></IonBackButton>
              </IonButtons>
              <IonTitle>{title}</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
}

export default BackHeader;