import { useCallback, useMemo } from "react";
import { api_routes } from "../../helper/routes";
import { axiosPublic } from "../../../axios";
import { CategorySlugProps, ProductSegmentState } from "../../helper/types";
import { segments } from "../../helper/constants";
import LoadingCard from "../LoadingCard";
import useSWRInfinite from "swr/infinite";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import ProductSliderCard from "../ProductCard/ProductSliderCard";

const PAGE_SIZE = 8;
type ProductSegmentProps = {
    segment: 'default' | 'is_new_arrival' | 'is_best_sale' | 'is_featured'
}

const ProductSegmentSlider: React.FC<CategorySlugProps & ProductSegmentProps> = ({category_slug, segment}) => {

    const segmentUrl = useMemo(()=>{
        if(segment==='default'){
            return 'Products';
        }
        return `&filter[${segment}]=true`
    },[segment])
    
    const segmentHeading = useMemo(()=>{
        if(segment==='default'){
            return '';
        }
        if(segments.filter(item => item.value===segment).length> 0){
            return segments.filter(item => item.value===segment)[0].name
        }
    },[segment])

    const productFetcher = async (url: string) => {
        const res =await axiosPublic.get(url);
        return res.data.data
    };
    
    const getProductKey = useCallback((pageIndex:any, previousPageData:any) => {
        if (previousPageData && previousPageData.length===0) return null;
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
        <div className="product-slider-segmentation-container pt-1 mt-1">
            <div className="page-padding mb-2">
                <div className="content-main">
                    <h2>{segmentHeading}</h2>
                </div>
            </div>

            <div className="category-slider">
                {isProductLoading && <LoadingCard />}
                <Swiper
                    modules={[Pagination]}
                    autoplay={false}
                    keyboard={false}
                    slidesPerView={'auto'}
                    centeredSlides={false}
                    pagination={{
                        dynamicBullets: true,
                    }}
                    spaceBetween={5}
                    scrollbar={false}
                    zoom={false}
                    onSlideNextTransitionEnd={(swiper)=>((productData ? productData.flat() : []).length>0 && (swiper.activeIndex+1)>=((productData ? productData.flat() : []).length/2)) && setProductSize(productSize+1)}
                >
                    {
                        (productData ? productData.flat() : []).map((item, i) => <SwiperSlide key={i}>
                            <ProductSliderCard id={item.id} image={item.featured_image_link} weight={item.weight} name={item.name} price={item.price} discounted_price={item.discounted_price}  link={`/products/${item.slug}`} />
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
}

export default ProductSegmentSlider;