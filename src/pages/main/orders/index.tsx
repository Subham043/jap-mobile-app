import {
    IonPage,
    IonContent,
    IonText,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
} from "@ionic/react";
import BackHeader from "../../../components/BackHeader";
import OrderCard from "../../../components/OrderCard";
import React, { useCallback, useContext, useRef, useState } from "react";
import { Order as OrderType } from "../../../helper/types";
import { api_routes } from "../../../helper/routes";
import { axiosPublic } from "../../../../axios";
import useSWRInfinite from "swr/infinite";
import LoadingCard from "../../../components/LoadingCard";
import { AuthContext } from "../../../context/AuthProvider";

const PAGE_SIZE = 20;

const Order: React.FC = () => {

    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const orderRef = useRef<HTMLIonInfiniteScrollElement | null>(null);
    const {auth} = useContext(AuthContext);

    const ordersFetcher = async (url: string) => {
        const res =await axiosPublic.get(url);
        setTimeout(async() => {
          if(orderRef && orderRef.current){
            await orderRef.current.complete()
          }
        }, 500)
        return res.data.data
    };
    
    const getOrderKey = useCallback((pageIndex:any, previousPageData:any) => {
        if(!auth.authenticated) return null;
        if (previousPageData && previousPageData.length===0) {
          setHasNextPage(false);
          return null
        };
        return `${api_routes.place_order_paginate}?total=${PAGE_SIZE}&page=${pageIndex+1}`;
    }, [])
    
    const {
          data,
          size,
          setSize,
          isLoading
    } = useSWRInfinite<OrderType>(getOrderKey, ordersFetcher, {
          initialSize:1,
          revalidateAll: false,
          revalidateFirstPage: false,
          persistSize: false,
          parallel: false
    });


    return (
        <IonPage>
            <BackHeader title='Orders' link='/account' />
            <IonContent fullscreen={false} forceOverscroll={false}>
                <div className="order-card-wrapper">
                    {
                        (data ? data.flat(): []).map((item, i) => <OrderCard {...item} key={i} />)
                    }
                </div>
                {data?.flat().length==0 && <IonText color={'success'}>
                    <p className="text-center mt-1">Oops! No orders available.</p>
                </IonText>}
                {isLoading && <LoadingCard />}
                <IonInfiniteScroll
                    ref={orderRef}
                    onIonInfinite={(ev) => {
                    if (ev.target.scrollTop + ev.target.offsetHeight>= ev.target.scrollHeight ){
                        !isLoading && setSize(size+1);
                    }
                    }}
                >
                        {hasNextPage && <IonInfiniteScrollContent loadingText="Please wait..." loadingSpinner="bubbles"></IonInfiniteScrollContent>}
                </IonInfiniteScroll>
            </IonContent>
        </IonPage>
    );
};

export default Order;
