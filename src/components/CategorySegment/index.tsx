import { IonCol, IonGrid, IonInfiniteScroll, IonInfiniteScrollContent, IonRow, IonText, } from "@ionic/react";
import { useCallback, useRef, useState } from "react";
import { api_routes } from "../../helper/routes";
import { axiosPublic } from "../../../axios";
import LoadingCard from "../LoadingCard";
import CategoryCard from "../CategoryCard";
import {CategoryState} from '../../helper/types';
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 20;

const CategorySegment: React.FC = () => {
    const categoryRef = useRef<HTMLIonInfiniteScrollElement | null>(null);

    const [hasNextCategoryPage, setHasNextCategoryPage] = useState<boolean>(true);


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
        <>
            <div className="content-main">
              <h2>Top Category</h2>
            </div>
            
            <IonGrid className="mt-1 p-0">
                <IonRow className="ion-align-items-center ion-justify-content-between p-0">

                {
                    (categoryData ? categoryData.flat() : []).map((item, i) => <IonCol
                    size="6"
                    size-xl="3"
                    size-lg="3"
                    size-md="4"
                    size-sm="6"
                    size-xs="6" className='p-0' key={i}
                >
                    <CategoryCard image={item.icon_image_link} name={item.name} link={`/category/${item.slug}`} />
                </IonCol>)
                }

                </IonRow>
            </IonGrid>
            {categoryData?.flat().length==0 && <IonText color={'success'}>
                <p className="text-center mt-1">Oops! No categories available.</p>
            </IonText>}
            {isCategoryLoading && <LoadingCard />}
            <IonInfiniteScroll
                ref={categoryRef}
                onIonInfinite={(ev) => {
                  if (ev.target.scrollTop + ev.target.offsetHeight>= ev.target.scrollHeight ){
                    !isCategoryLoading && setCategorySize(categorySize+1);
                  }
                }}
              >
                {hasNextCategoryPage && <IonInfiniteScrollContent loadingText="Please wait..." loadingSpinner="bubbles"></IonInfiniteScrollContent>}
            </IonInfiniteScroll>

        </>
    );
}

export default CategorySegment;