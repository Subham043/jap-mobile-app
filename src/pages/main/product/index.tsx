import { IonPage, IonContent, IonHeader, IonToolbar, IonSearchbar, IonButton, IonIcon, IonButtons, SearchbarInputEventDetail, IonInfiniteScroll, IonInfiniteScrollContent, IonText, IonGrid, IonRow, IonCol, IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';
import {axiosPublic} from '../../../../axios';
import { api_routes } from '../../../helper/routes';
import { useCallback, useEffect, useRef, useState } from 'react';
import MainFooter from '../../../components/MainFooter';
import { filterCircleOutline } from 'ionicons/icons';
import { ProductSegmentState } from '../../../helper/types';
import useSWRInfinite from "swr/infinite";
import LoadingCard from '../../../components/LoadingCard';
import ProductCard from '../../../components/ProductCard';
import FilterModal from '../../../components/FilterModal';

const PAGE_SIZE = 20;

const Product: React.FC = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [segment, setSegment] = useState<string>('default')
  const [star, setStar] = useState<string>('default')
  const [category, setCategory] = useState<string>('default')
  const [search, setSearch] = useState<string|null|undefined>('')
  const [sort, setSort] = useState<string|null|undefined>('-id')
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const productRef = useRef<HTMLIonInfiniteScrollElement | null>(null);

  useEffect(() => {
    let isMounted = true
    isMounted && setHasNextPage(true);
    return () => {isMounted=false}
  }, [search, sort, segment, star, category])

  const searchHandler = useCallback((ev: CustomEvent<SearchbarInputEventDetail>):void => setSearch(ev.detail.value), [search])
  
  const productFetcher = async (url: string) => {
    const res =await axiosPublic.get(url);
    setTimeout(async() => {
      if(productRef && productRef.current){
        await productRef.current.complete()
      }
    }, 500)
    return res.data.data
  };

  const getProductKey = useCallback((pageIndex:any, previousPageData:any) => {
    if (previousPageData && previousPageData.length===0) {
      setHasNextPage(false);
      return null;
    }
    return `${api_routes.products}?total=${PAGE_SIZE}&page=${pageIndex+1}&sort=${sort}${segment=='default' ? '' : '&filter['+segment+']=true'}${star=='default' ? '' : '&filter[has_reviews]='+star}${category=='default' ? '' : '&filter[has_categories]='+category}${search ? '&filter[search]='+search : ''}`;
  }, [PAGE_SIZE, sort, segment, star, category, search])

  const {
      data:productData,
      size:productSize,
      setSize:setProductSize,
      isLoading:isProductLoading,
      mutate
  } = useSWRInfinite<ProductSegmentState>((pageIndex, previousPageData)=>getProductKey(pageIndex, previousPageData), productFetcher, {
      initialSize:1,
      revalidateAll: false,
      revalidateFirstPage: false,
      persistSize: false,
      parallel: false
  });
  

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar className='main-header-background'> 
            <IonSearchbar showClearButton="focus" debounce={500} onIonInput={(ev) => searchHandler(ev)}></IonSearchbar>
            <IonButtons slot="end">
                <IonButton size='large' color='success' shape='round' fill='clear' className='filter-btn' onClick={()=>setIsOpen(true)}>
                    <IonIcon icon={filterCircleOutline}></IonIcon>
                </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent
          fullscreen={false}
          forceOverscroll={false}
        >
          <IonRefresher slot="fixed" onIonRefresh={(event: CustomEvent<RefresherEventDetail>)=>{
              mutate();
              event.detail.complete();
          }}>
              <IonRefresherContent></IonRefresherContent>
          </IonRefresher>

          <div className='ion-padding pt-0 pb-0'>
            <div className="content-main mt-2">
              <h2>Our Products</h2>
            </div>
          </div>

          <div className='ion-padding pt-0 min-height-100'>
              
              <IonGrid className="mt-1 p-0">
                  <IonRow className="ion-align-items-center ion-justify-content-between p-0">
                  {
                      (productData ? productData.flat() : []).map((item, i) => <IonCol
                      size="6"
                      size-xl="3"
                      size-lg="3"
                      size-md="4"
                      size-sm="6"
                      size-xs="6" className='p-0' key={i}
                  >
                      <ProductCard id={item.id} image={item.featured_image_link} name={item.name} price={item.price} discounted_price={item.discounted_price}  link={`/products/${item.slug}`} />
                  </IonCol>)
                  }

                  </IonRow>
              </IonGrid>
              {productData?.flat().length==0 && <IonText color={'success'}>
                <p className="text-center mt-1">Oops! No products available.</p>
              </IonText>}
              {isProductLoading && <LoadingCard />}
              <IonInfiniteScroll
                ref={productRef}
                onIonInfinite={(ev) => {
                  if (ev.target.scrollTop + ev.target.offsetHeight>= ev.target.scrollHeight ){
                    !isProductLoading && setProductSize(productSize+1);
                  }
                }}
              >
                      {hasNextPage && <IonInfiniteScrollContent loadingText="Please wait..." loadingSpinner="bubbles"></IonInfiniteScrollContent>}
              </IonInfiniteScroll>
          </div>
        
          <MainFooter />

          <FilterModal isOpen={isOpen} setIsOpen={setIsOpen} segment={segment} setSegment={setSegment} star={star} setStar={setStar} category={category} setCategory={setCategory} sort={sort} setSort={setSort} />

        </IonContent>
      </IonPage>
    );
  };
  
export default Product;