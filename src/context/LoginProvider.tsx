import React, { createContext, useContext, useState } from "react";
import { ChildrenType } from "../helper/types";
import { IonCard, IonCol, IonGrid, IonModal, IonRow } from "@ionic/react";
import LoginForm from "../components/LoginForm";

type LoginContextType = {
  toggleLoginModal: () => void;
}

const cartDefaultValues: LoginContextType = {
  toggleLoginModal: () => {}
};

export const LoginContext = createContext<LoginContextType>(cartDefaultValues);

export const useLogin = () => useContext(LoginContext);

const LoginProvider: React.FC<ChildrenType> = ({children}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleLoginModal = () => setIsOpen(prev => !prev)
    
    return (
      <LoginContext.Provider value={{toggleLoginModal}}>
          {children}
          <IonModal isOpen={isOpen} onDidDismiss={()=>setIsOpen(false)} initialBreakpoint={1} breakpoints={[0, 1]} className='login-modal-main'>
              <div className="auth-main-background auth-modal-background">
                  <IonGrid>
                      <IonRow className="ion-align-items-center ion-justify-content-center">
                          <IonCol
                          size="6"
                          size-xl="6"
                          size-lg="6"
                          size-md="6"
                          size-sm="12"
                          size-xs="12"
                          >
                            <IonCard className="auth-card-background">
                                <LoginForm toggleLoginModal={toggleLoginModal} />
                            </IonCard>
                          </IonCol>
                      </IonRow>
                  </IonGrid>
              </div>
          </IonModal>
      </LoginContext.Provider>
    );
}

export default LoginProvider;
