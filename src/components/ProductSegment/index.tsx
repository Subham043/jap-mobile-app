import { IonCol, IonGrid, IonInfiniteScroll, IonInfiniteScrollContent, IonLabel, IonRow, IonSegment, IonSegmentButton, IonText } from "@ionic/react";
import { useCallback, useRef, useState } from "react";
import { api_routes } from "../../helper/routes";
import { axiosPublic } from "../../../axios";
import { CategorySlugProps, ProductSegmentState } from "../../helper/types";
import { segments } from "../../helper/constants";
import LoadingCard from "../LoadingCard";
import ProductCard from "../ProductCard";
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 20;

const ProductSegment: React.FC<CategorySlugProps> = ({category_slug}) => {
    const productRef = useRef<HTMLIonInfiniteScrollElement | null>(null);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const [segment, setSegment] = useState<string>('default')
    const [segmentUrl, setSegmentUrl] = useState<string>('')

    const segmentChangeHandler = useCallback((data:any):void => {
        setSegment(data.detail.value)
        if(data.detail.value==='default'){
            setSegmentUrl('')
            return;
        }
        setSegmentUrl(`&filter[${data.detail.value}]=true`)
        setHasNextPage(true);
    }, [segmentUrl])

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
        return `${api_routes.products}?total=${PAGE_SIZE}&page=${pageIndex+1}&sort=-id&${category_slug ? `filter[has_categories]=${category_slug}` : ``}${segmentUrl}`;
    }, [PAGE_SIZE, category_slug, segmentUrl])
    
    const {
          data:productData,
          size:productSize,
          setSize:setProductSize,
          isLoading:isProductLoading
    } = useSWRInfinite<ProductSegmentState>((pageIndex, previousPageData)=>getProductKey(pageIndex, previousPageData), productFetcher, {
          initialSize:1,
          revalidateAll: false,
          revalidateFirstPage: false,
          persistSize: false,
          parallel: false
    });
    
    return (
        <>

            <IonSegment scrollable={true} value={segment} color="success" onIonChange={(data)=>segmentChangeHandler(data)} className="mt-1">
                {
                    segments.map((item, i)=><IonSegmentButton value={item.value} key={i}>
                    <IonLabel>{item.name}</IonLabel>
                    </IonSegmentButton>)
                }
            </IonSegment>

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

        </>
    );
}

export default ProductSegment;