import { IonApp, IonTabs, IonRouterOutlet, IonGrid, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { homeOutline, fileTrayStackedOutline, cartOutline, personCircleOutline } from "ionicons/icons";
import { Route, Redirect } from "react-router";
import ForgotPassword from "../../pages/auth/forgot-password";
import Login from "../../pages/auth/login";
import Register from "../../pages/auth/register";
import Category from "../../pages/main/category";
import Order from "../../pages/main/orders";
import OrderDetail from "../../pages/main/orders/detail";
import Product from "../../pages/main/product";
import Setting from "../../pages/main/setting";
import Wishlist from "../../pages/main/wishlist";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Account from "../../pages/main/account";
import { useCart } from "../../context/CartProvider2";
import B2B from "../../pages/main/b2b";
import { Network } from '@capacitor/network';
import NoNetwork from "../NoNetwork";
import Home2 from "../../pages/main/home/home";
import Cart2 from "../../pages/main/cart/Cart2";
import ProductDetail2 from "../../pages/main/product/detail2";

const PageTabs: React.FC = () => {
  const {auth} = useContext(AuthContext);
  const {cart } = useCart();
  const [hasNetwork, setHasNetwork] = useState<boolean>(true);

  useEffect(()=>{
    let isMounted = true;
    const logCurrentNetworkStatus = async () => {
      const status = await Network.getStatus();
      setHasNetwork(status.connected);
    };
    if(isMounted){
      Network.addListener('networkStatusChange', async (status) => await logCurrentNetworkStatus());
      logCurrentNetworkStatus()
    }

    return () => {
      Network.removeAllListeners()
      isMounted=false;
    }
  }, [])

  if(!hasNetwork) {
    return <NoNetwork />
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/forgot_password" component={ForgotPassword}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/home" component={Home2}></Route>
            <Route exact path="/category/:slug" component={Category}></Route>
            <Route exact path="/products" component={Product}></Route>
            <Route exact path="/products/:slug" component={ProductDetail2}></Route>
            <Route exact path="/cart" component={Cart2}></Route>
            <Route exact path="/wishlist" component={Wishlist}></Route>
            <Route exact path="/account" component={auth.authenticated ? Account : Login}></Route>
            <Route exact path="/setting" component={Setting}></Route>
            <Route exact path="/b2b-enquiry" component={B2B}></Route>
            <Route exact path="/orders" component={Order}></Route>
            <Route exact path="/orders/:receipt" component={OrderDetail}></Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <IonGrid className='h-100'></IonGrid>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton className='main-tabs' tab="home" href="/home">
              <IonIcon icon={homeOutline} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>

            <IonTabButton className='main-tabs' tab="products" href="/products">
              <IonIcon icon={fileTrayStackedOutline} />
              <IonLabel>Products</IonLabel>
            </IonTabButton>

            <IonTabButton className='main-tabs' tab="cart" href="/cart">
              <>
                <IonIcon icon={cartOutline} />
                <IonBadge color="success">{cart ? cart.products.length : 0}</IonBadge>
              </>
              <IonLabel>Cart</IonLabel>
            </IonTabButton>

            <IonTabButton className='main-tabs' tab="account" href="/account">
              <IonIcon icon={personCircleOutline} />
              <IonLabel>Account</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}

export default PageTabs;