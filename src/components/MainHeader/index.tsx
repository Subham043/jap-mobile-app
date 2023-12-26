import { IonHeader, IonImg, IonToolbar } from "@ionic/react";

const MainHeader: React.FC = () => {
    return (
        <IonHeader translucent={true} className='main-header-background'>
            <IonToolbar className='main-header-background'>
              <IonImg
                  src="/images/logo.webp"
                  alt="Logo"
                  className="main-img-logo"
              ></IonImg>
            </IonToolbar>
        </IonHeader>
    );
}

export default MainHeader;