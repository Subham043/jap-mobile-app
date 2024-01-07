import {
    IonPage,
    IonContent,
} from "@ionic/react";
import BackHeader from "../../../components/BackHeader";
import Profile from "../../../components/Profile";
import SettingComponent from "../../../components/Setting";

const Setting: React.FC = () => {

    return (
        <IonPage>
            <BackHeader title='Setting' link='/account' />
            <IonContent fullscreen={false} forceOverscroll={false}>
              <div className="mt-1 mb-1">
                <div className="product-detail-main-specification">
                  <div className="page-padding product-detail-main-content-heading">
                      <h6>Profile Information</h6>
                  </div>
                  <div className="page-padding">
                    <Profile />
                  </div>
                </div>
                <div className="product-detail-main-specification">
                  <div className="page-padding product-detail-main-content-heading">
                      <h6>Password Information</h6>
                  </div>
                  <div className="page-padding">
                    <SettingComponent />
                  </div>
                </div>
              </div>
            </IonContent>
        </IonPage>
    );
};

export default Setting;
