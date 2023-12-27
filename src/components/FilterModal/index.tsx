import { IonContent, IonLabel, IonHeader, IonToolbar, IonTitle, IonButton, IonItem, IonModal, IonButtons, IonAccordionGroup, IonAccordion, SelectChangeEventDetail, IonRadioGroup, IonRadio, RadioGroupChangeEventDetail, IonSpinner, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/react';
import { useCallback, useRef, useState } from 'react';
import useSWRInfinite from "swr/infinite";
import { axiosPublic } from '../../../axios';
import { api_routes } from '../../helper/routes';
import { CategoryState } from '../../helper/types';
import { segments, sorts, stars } from '../../helper/constants';

const PAGE_SIZE = 20;

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  segment: string;
  setSegment: React.Dispatch<React.SetStateAction<string>>;
  star: string;
  setStar: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  sort: string|null|undefined;
  setSort: React.Dispatch<React.SetStateAction<string|null|undefined>>;
}

const FilterModal: React.FC<Props> = ({isOpen, setIsOpen, segment, setSegment, star, setStar, category, setCategory, sort, setSort}) => {

  const [hasNextCategoryPage, setHasNextCategoryPage] = useState<boolean>(true);

  const categoryRef = useRef<HTMLIonInfiniteScrollElement | null>(null);
  
  const sortHandler = useCallback((ev: CustomEvent<SelectChangeEventDetail>):void => setSort(ev.detail.value), [sort])

  const segmentHandler = useCallback((data:CustomEvent<RadioGroupChangeEventDetail>):void => setSegment(data.detail.value), [segment])
  
  const starHandler = useCallback((data:CustomEvent<RadioGroupChangeEventDetail>):void => setStar(data.detail.value), [star])
  
  const categoryHandler = useCallback((data:CustomEvent<RadioGroupChangeEventDetail>):void => setCategory(data.detail.value), [category])

  const categoryFetcher = async (url: string) => {
    const res =await axiosPublic.get(url);
    setTimeout(async() => {
      if(categoryRef && categoryRef.current){
        await categoryRef.current.complete()
      }
    }, 500)
    return res.data.data
  };

  const getCategoryKey = useCallback((pageIndex:any, previousPageData:any) => {
    if (previousPageData && previousPageData.length===0) {
      setHasNextCategoryPage(false);
      return null
    };
    return `${api_routes.categories}?total=${PAGE_SIZE}&page=${pageIndex+1}`;
  }, [])

  const {
      data:categoryData,
      size:categorySize,
      setSize:setCategorySize,
      isLoading:isCategoryLoading
  } = useSWRInfinite<CategoryState>(getCategoryKey, categoryFetcher, {
      initialSize:1,
      revalidateAll: false,
      revalidateFirstPage: false,
      persistSize: false,
      parallel: false
  });
  

    return (
      <IonModal isOpen={isOpen} onDidDismiss={()=>setIsOpen(false)} initialBreakpoint={1} breakpoints={[0, 0.3, 0.5, 0.8, 1]} className='filter-modal-main'>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Filters</IonTitle>
            <IonButtons slot="end">
              <IonButton  size="small" color='success' shape='round' fill='outline' strong={true}  onClick={()=>setIsOpen(false)}>
                Apply
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonAccordionGroup>
            <IonAccordion value="first">
              <IonItem slot="header" color="light">
                <IonLabel>Sort</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                <IonRadioGroup value={sort} onIonChange={(ev)=> sortHandler(ev)}>
                    {
                      sorts.map((item, i) => <div key={i}>
                        <IonRadio value={item.value} labelPlacement="end">{item.name}</IonRadio>
                        <br/>
                      </div>)
                    }
                </IonRadioGroup>
              </div>
            </IonAccordion>
            <IonAccordion value="second">
              <IonItem slot="header" color="light">
                <IonLabel>Special Features</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                <IonRadioGroup value={segment} onIonChange={(ev)=> segmentHandler(ev)}>
                  {segments.map((item, i) => <div key={i}>
                    <IonRadio value={item.value} labelPlacement="end">{item.name}</IonRadio>
                    <br/>
                  </div>)}
                </IonRadioGroup>
              </div>
            </IonAccordion>
            <IonAccordion value="third">
              <IonItem slot="header" color="light">
                <IonLabel>Category</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                <IonRadioGroup value={category} onIonChange={(ev)=> categoryHandler(ev)}>
                  <IonRadio value={'default'} labelPlacement="end">All</IonRadio>
                    <br/>
                  {(categoryData ? categoryData.flat() : []).map((item, i) => <div key={i}>
                    <IonRadio value={item.slug} labelPlacement="end">{item.name}</IonRadio>
                    <br/>
                  </div>)}
                  <br/>
                  {isCategoryLoading && <div className='text-center'><IonSpinner name="crescent" color="success"></IonSpinner></div>}
                  <IonInfiniteScroll
                    ref={categoryRef}
                    onIonInfinite={(ev) => {
                      if (ev.target.scrollTop + ev.target.offsetHeight>= ev.target.scrollHeight ){
                        !isCategoryLoading && setCategorySize(categorySize+1);
                      }
                    }}
                  >
                    {hasNextCategoryPage && <IonInfiniteScrollContent></IonInfiniteScrollContent>}
                  </IonInfiniteScroll>
                </IonRadioGroup>
              </div>
            </IonAccordion>
            <IonAccordion value="fourth">
              <IonItem slot="header" color="light">
                <IonLabel>Reviews</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                <IonRadioGroup value={star} onIonChange={(ev)=>starHandler(ev)}>
                    {
                      stars.map((item, i) => <div key={i}>
                        <IonRadio value={item.value} labelPlacement="end">{item.name}</IonRadio>
                        <br/>
                      </div>)
                    }
                </IonRadioGroup>
              </div>
            </IonAccordion>
          </IonAccordionGroup>
        </IonContent>
      </IonModal>
    );
  };
  
export default FilterModal;