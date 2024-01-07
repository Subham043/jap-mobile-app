import { IonPage, IonContent, ScrollDetail, IonToolbar, IonImg, IonIcon, IonHeader, IonTitle } from '@ionic/react';
import { useCallback, useRef, useState } from 'react';
import MainFooter from '../../../components/MainFooter';
import { Link } from 'react-router-dom';
import { searchOutline } from 'ionicons/icons';
import Slider2 from '../../../components/Slider/Slider2';
import CategorySlider from '../../../components/CategorySegment/CategorySlider';
import ProductSegmentSlider from '../../../components/ProductSegment/ProductSegmentSlider';

const images = [
  '/images/b1.webp',
  '/images/b2.webp',
  '/images/b3.webp',
  '/images/b4.webp',
];



const Home2: React.FC = () => {

  const [showSubHeader, setShowSubHeader] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement|null>(null)

  const handleScroll = useCallback((ev: CustomEvent<ScrollDetail>) => ev.detail.scrollTop>=((ref && ref.current) ? ref?.current?.offsetTop : 475) ? setShowSubHeader(true) : setShowSubHeader(false), [])
  

    return (
      <IonPage>
        <IonHeader mode='ios' translucent={true} className={`custom-main-header-home-bg custom-main-header-home-secondary ${showSubHeader ? 'custom-main-header-home-translucent-active' : 'custom-main-header-home-translucent'}`}>
          <IonToolbar className='main-home-header-toolbar-background'>
            <IonTitle className="page-padding main-home-header-title main-home-header-title-second">
              <Link to='/products' className='searchbar-home-btn'>
                <h3>Search anything</h3>
                <IonIcon icon={searchOutline} className='searchbar-home-icon'></IonIcon>
              </Link>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent
          fullscreen={true}
          forceOverscroll={false}
          scrollEvents={true}
          onIonScroll={handleScroll}
        >
          <IonHeader mode='ios' collapse="condense" className='custom-main-header-home-bg custom-main-header-home-condensed'>
            <IonToolbar className='main-home-header-toolbar-background'>
                <IonTitle className="page-padding main-home-header-title" size='large'>
                  <IonImg
                      src="/images/logo.webp"
                      alt="Logo"
                      className="main-home-img-logo"
                  ></IonImg>
                  <div ref={ref}>
                    <Link to='/products' className='searchbar-home-btn'>
                      <h3>Search anything</h3>
                      <IonIcon icon={searchOutline} className='searchbar-home-icon'></IonIcon>
                    </Link>
                  </div>
                </IonTitle>
            </IonToolbar>
          </IonHeader>
          {/* <div className='main-home-header-background'>
              <IonToolbar className='main-home-header-toolbar-background'>
                <IonImg
                    src="/images/logo.webp"
                    alt="Logo"
                    className="main-home-img-logo"
                ></IonImg>
              </IonToolbar>
          </div>
          <div ref={ref} className={`ion-padding searchbar-home-sticky ${showSubHeader ? 'searchbar-home-sticky-active' : ''}`}>
            <Link to='/products' className='searchbar-home-btn'>
              <h3>Search anything</h3>
              <IonIcon icon={searchOutline} className='searchbar-home-icon'></IonIcon>
            </Link>
          </div> */}
          <div className='ion-padding page-padding home-slider'>
            <Slider2 images={images} />
          </div>
          <div className='page-padding pt-0 mb-2'>
            <div className="content-main">
              <p>JAP-PCL was created as a multi-state farmer's producer company, started by shareholder-member farmers from Karnataka, Tamil Nadu, Kerala and Andhra Pradesh. All these farmers practice only organic farming or natural farming, and hence the names, jaivik (organic) and pratrutik (natural). These organic farmers have been certified since 2015. Later, the new PCL was joined by small holders certified groups (ICS groups – Internal Control Systems) from different districts/locations from the 4 states, thus giving a wider basket of offerings for FPOs to connect to markets and buyers.</p>
              <p>The formation of JAP-PCL and connecting it to buyers and markets are powered and facilitated by ICCOA – International Competence Centre for Organic Agriculture as part of its strategy to incubate a farmer - producer company to maintain and carry forward the sustainable farming status and organic certification of farmer groups created by ICCOA's projects during the last ten years or so.</p>
            </div>
          </div>
          <CategorySlider />
          <ProductSegmentSlider segment='is_featured' />
          <ProductSegmentSlider segment='is_new_arrival' />
          <ProductSegmentSlider segment='is_best_sale' />
          <MainFooter />
        </IonContent>
      </IonPage>
    );
  };
  
export default Home2;