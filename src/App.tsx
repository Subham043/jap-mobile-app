import {
  setupIonicReact
} from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import 'react-toastify/dist/ReactToastify.css';

import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';

/* Theme variables */
import './theme/variables.css';
import './theme/global.css';
import './theme/main.css';

import AuthProvider from './context/AuthProvider';
import PageTabs from './components/PageTabs';
import { ToastContainer } from 'react-toastify';
import SwrLayout from './layout/SwrLayout';
import CartProvider2 from './context/CartProvider2';
import WishlistProvider2 from './context/WishlistProvider2';
import LoginProvider from './context/LoginProvider';

setupIonicReact();

const App: React.FC = () => {

  return (
    <AuthProvider>
      <SwrLayout>
        <LoginProvider>
          <CartProvider2>
            <WishlistProvider2>
              <PageTabs />
              <ToastContainer />
            </WishlistProvider2>
          </CartProvider2>
        </LoginProvider>
      </SwrLayout>
    </AuthProvider>
  )
};

export default App;
