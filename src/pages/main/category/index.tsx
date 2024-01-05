import { IonPage, IonContent, IonImg, IonHeader, IonToolbar, IonButtons, IonBackButton, IonSpinner, IonRefresher, IonRefresherContent, RefresherEventDetail, ScrollDetail, IonTitle } from '@ionic/react';
import {axiosPublic} from '../../../../axios';
import { api_routes } from '../../../helper/routes';
import MainFooter from '../../../components/MainFooter';
import ProductSegment from '../../../components/ProductSegment';
import { RouteComponentProps } from "react-router";
import { useCallback, useRef, useState } from 'react';
import LoadingDetail from '../../../components/LoadingDetail';
import useSWR from 'swr'
import { CategoryState } from '../../../helper/types';

interface CategoryProps extends RouteComponentProps<{
  slug: string;
}> {}

const fetcher = (url: string) => axiosPublic.get(url).then((res) => res.data.category);

const Category: React.FC<CategoryProps> = ({match}) => {

    const [showSubHeader, setShowSubHeader] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement|null>(null)

    const handleScroll = useCallback((ev: CustomEvent<ScrollDetail>) => ev.detail.scrollTop>=((ref && ref.current) ? ref?.current?.offsetTop : 475) ? setShowSubHeader(true) : setShowSubHeader(false), [])
  
    const [imgLoading, setImgLoading] = useState<boolean>(true);
    const { data:category, isLoading:loading, mutate } = useSWR<CategoryState>(api_routes.category+`/${match.params.slug}`, fetcher);

    return (
      <IonPage>
        <IonHeader mode='ios' translucent={false} className=''>
            <IonToolbar className='main-header-background'>
              <IonButtons slot="start">
                <IonBackButton defaultHref='/home' color='success'></IonBackButton>
              </IonButtons>
              {showSubHeader && <IonTitle>{category?.name}</IonTitle>}
            </IonToolbar>
        </IonHeader>
        <IonContent
          fullscreen={false}
          forceOverscroll={false}
          scrollEvents={true}
          onIonScroll={handleScroll}
        >
          <IonRefresher slot="fixed" onIonRefresh={(event: CustomEvent<RefresherEventDetail>)=>{
              mutate();
              event.detail.complete();
          }}>
              <IonRefresherContent></IonRefresherContent>
          </IonRefresher>

          {loading ? 
            <LoadingDetail /> :
            (category && <>
              {
                  imgLoading &&
                  <div className="text-center mt-1">
                      <IonSpinner color='success' />
                  </div>
              }
              <IonImg
                  src={category.banner_image_link}
                  alt="Sliders"
                  style={{width: '100%'}}
                  onIonImgDidLoad={()=>setImgLoading(false)}
              ></IonImg>
              <div ref={ref} className='ion-padding content-main pt-10'>
                  <h1>{category.name}</h1>
                  {category.description && <p className='mb-0' style={{textAlign: 'center'}}>{category.description}</p>}
              </div>
            </>)
          }
          <div className='page-padding'>
            <ProductSegment category_slug={match.params.slug} />
          </div>
          <MainFooter />
        </IonContent>
      </IonPage>
    );
  };
  
export default Category;