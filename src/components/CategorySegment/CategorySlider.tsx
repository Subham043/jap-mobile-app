import { useCallback } from "react";
import { api_routes } from "../../helper/routes";
import { axiosPublic } from "../../../axios";
import LoadingCard from "../LoadingCard";
import {CategoryState} from '../../helper/types';
import useSWRInfinite from "swr/infinite";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import CategorySliderCard from "../CategoryCard/CategorySliderCard";

const PAGE_SIZE = 8;

const CategorySlider: React.FC = () => {

    const categoryFetcher = async (url: string) => {
        const res =await axiosPublic.get(url);
        return res.data.data
    };

    const getCategoryKey = useCallback((pageIndex:any, previousPageData:any) => {
        if (previousPageData && previousPageData.length===0) return null;
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
        <div className="category-slider-segmentation-container pt-1 mt-1">
            <div className="page-padding mb-2">
                <div className="content-main">
                <h2>Top Category</h2>
                </div>
            </div>
            <div className="category-slider">
                {isCategoryLoading && <LoadingCard />}
                <Swiper
                    modules={[Pagination]}
                    autoplay={false}
                    keyboard={false}
                    pagination={{
                        dynamicBullets: true,
                    }}
                    slidesPerView={2}
                    centeredSlides={false}
                    spaceBetween={0}
                    scrollbar={false}
                    zoom={false}
                    onSlideNextTransitionEnd={(swiper)=>((categoryData ? categoryData.flat() : []).length>0 && (swiper.activeIndex+1)>=((categoryData ? categoryData.flat() : []).length/2)) && setCategorySize(categorySize+1)}
                >
                    {
                        (categoryData ? categoryData.flat() : []).map((item, i) => <SwiperSlide key={i}>
                            <CategorySliderCard image={item.icon_image_link} name={item.name} link={`/category/${item.slug}`} />
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>

        </div>
    );
}

export default CategorySlider;