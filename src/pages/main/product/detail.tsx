import { IonPage, IonContent, ScrollDetail, IonButton, IonCol, IonIcon, IonItemDivider, IonRow, IonText, IonCard, IonSpinner, IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import {axiosPublic} from '../../../../axios';
import { api_routes } from '../../../helper/routes';
import { useCallback, useRef, useState } from 'react';
import MainFooter from '../../../components/MainFooter';
import { bookmarkOutline } from 'ionicons/icons';
import BackHeader from '../../../components/BackHeader';
import Slider from '../../../components/Slider';
import { ProductSegmentState } from '../../../helper/types';
import LoadingDetail from '../../../components/LoadingDetail';
import LoadingPricingTable from '../../../components/LoadingPricingTable';
import Review from '../../../components/Review';
import CartQuantityMain from '../../../components/CartQuantityMain';
import { useCart } from '../../../context/CartProvider2';
import { useToast } from '../../../hooks/useToast';
import useSWR from 'swr'
import { useWishlist } from '../../../context/WishlistProvider2';
import CheckPincode from '../../../components/CheckPincode';

const fetcher = (url: string) => axiosPublic.get(url).then((res) => res.data.product);

interface ProductProps extends RouteComponentProps<{
    slug: string;
}> {}

const ProductDetail: React.FC<ProductProps> = ({match}) => {

    const { data:product, isLoading:productLoading, mutate } = useSWR<ProductSegmentState>(match.params.slug ? api_routes.product+`/${match.params.slug}` : null, fetcher);
    const ref = useRef<HTMLDivElement|null>(null)
    const {wishlist, updateWishlist} = useWishlist();
    const {cart, incrementProductQuantity, decrementProductQuantity } = useCart();
    const {toastSuccess} = useToast();
    const [loading, setLoading] = useState<boolean>(false);
    const [wishlistLoading, setWishlistLoading] = useState<boolean>(false);
    const [showSubHeader, setShowSubHeader] = useState<boolean>(false);

    const incrementQuantity = async () => {
        try {
            setLoading(true);
            if(product){
                await incrementProductQuantity(product.id);
            }
        } finally {
            setLoading(false);
        }
    };
    const decrementQuantity = async () => {
        try {
            setLoading(true);
            if(product){
                await decrementProductQuantity(product.id)
            }
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = useCallback((ev: CustomEvent<ScrollDetail>) => ev.detail.scrollTop>=((ref && ref.current) ? ref?.current?.offsetTop : 300) ? setShowSubHeader(true) : setShowSubHeader(false), [])

    const wishlistHandler = async (id:number) => {   
        try{
            setWishlistLoading(true)
            if(product && wishlist){
                if([...wishlist.products.map(item=>item.id)].indexOf(id)<0){
                    await updateWishlist([product.id, ...wishlist.products.map(item=>item.id)])
                    toastSuccess('Product added to wishlist');
                } else{
                    const filteredWishlist = wishlist.products.filter(item=> item.id!=id);
                    await updateWishlist([...filteredWishlist.map(item=>item.id)])
                    toastSuccess('Product removed from wishlist');
                }
            }
        }finally{
            setWishlistLoading(false)
        }
    }

    return (
      <IonPage>
        <BackHeader title={product ? product.name : ''} link='/products' />
        <IonContent
          fullscreen={false}
          forceOverscroll={false}
          scrollEvents={true}
          onIonScroll={handleScroll}
          style={{'--background':'#f9f9f9'}}
        >
            <IonRefresher slot="fixed" onIonRefresh={(event: CustomEvent<RefresherEventDetail>)=>{
                mutate();
                event.detail.complete();
            }}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>

            {productLoading ? <>
                <LoadingDetail />
                <LoadingPricingTable />
                <LoadingPricingTable />
            </> : 
            (product && <>
                <div style={{width:'100%', backgroundColor:'#fff'}}>
                    <Slider images={[product.featured_image_link? product.featured_image_link : '', ...product.other_images.map(item=>item.image_link ? item.image_link : '')]} />
                </div>
                <div ref={ref} className={`content-main custom-main-header product-main-header-radius ${showSubHeader ? 'custom-secondary-header-bg' : ''}`}>
                    <div className="ion-padding pt-0 pb-0">
                        <IonRow className="ion-align-items-center p-0 mt- w-100">
                            <IonCol
                                size="9"
                                className='text-left'
                            >
                                <IonText color="success" className="text-left mb-0 pb-0">
                                    <h5 className="text-left mb-0 pb-0 mt-0 pt-0">{product?.name}</h5>
                                </IonText>
                                <div style={{marginTop:5, marginBottom: 5}}>
                                    <p className='p-0 m-0'>{ product?.price !== product?.discounted_price && <s>&#8377; {product?.price}</s> }<b>&#8377; {product?.discounted_price}</b></p>
                                </div>
                            </IonCol>
                            <IonCol
                                size="3"
                                className='text-right'
                            >
                                {
                                    wishlistLoading ? <IonSpinner name="dots" color={'success'}></IonSpinner> : 
                                    (wishlist && <IonButton className="m-0 p-0" fill='solid' size='small' disabled={wishlistLoading} color={[...wishlist.products.map(item => item.id)].indexOf(product.id)<0 ? "success" : "danger"} onClick={()=>wishlistHandler(product.id)}>
                                        <IonIcon slot="start" icon={bookmarkOutline}></IonIcon>
                                        {[...wishlist.products.map(item => item.id)].indexOf(product.id)<0 ? 'wishlist' : 'remove'}
                                    </IonButton>)
                                }
                            </IonCol>
                        </IonRow>
                    </div>
                </div>


                <div>
                    <IonCard className="final-table">
                        <div className='ion-padding pt-0 pb-0'>
                            <div className="content-main mt-1">
                                <h6>Specification</h6>
                            </div>
                        </div>
                        <div className='ion-padding pt-0'>
                            <div className="content-main">
                               {product.description && <p className='mb-0'>{product.description}</p>}
                            </div>
                        </div>
                        <div className='mb-1'>
                            {product.categories.length>0 && <IonItemDivider className="category-divider category-divider-end">
                                <IonRow className="ion-align-items-center ion-justify-content-between p-0 mt- w-100">
                                    <IonCol
                                        size="3"
                                        className='text-left'
                                    >
                                        <p className='p-0 m-0 font-normal'><code>Category</code></p>
                                    </IonCol>
                                    <IonCol
                                        size="9"
                                        className='text-right'
                                    >
                                        <p className='p-0 m-0 font-normal'>{
                                            product.categories.map((item, i)=>product.categories.length==i+1 ? item.name : `${item.name}, `)
                                        }</p>
                                    </IonCol>
                                </IonRow>
                            </IonItemDivider>}
                            <IonItemDivider className="category-divider category-divider-end">
                                <IonRow className="ion-align-items-center ion-justify-content-between p-0 mt- w-100">
                                    <IonCol
                                        size="3"
                                        className='text-left'
                                    >
                                        <p className='p-0 m-0 font-normal'><code>In Stock</code></p>
                                    </IonCol>
                                    <IonCol
                                        size="9"
                                        className='text-right'
                                    >
                                        <p className='p-0 m-0 font-normal'>{
                                            product.in_stock ? 'Yes' : 'No'
                                        }</p>
                                    </IonCol>
                                </IonRow>
                            </IonItemDivider>
                            <IonItemDivider className="category-divider category-divider-end">
                                <IonRow className="ion-align-items-center ion-justify-content-between p-0 mt- w-100">
                                    <IonCol
                                        size="4"
                                        className='text-left'
                                    >
                                        <p className='p-0 m-0 font-normal'><code>Items Left</code></p>
                                    </IonCol>
                                    <IonCol
                                        size="8"
                                        className='text-right'
                                    >
                                        <p className='p-0 m-0 font-normal'>{
                                            product.inventory
                                        }</p>
                                    </IonCol>
                                </IonRow>
                            </IonItemDivider>
                        </div>
                        
                    </IonCard>
                </div>
                
                <IonCard className="final-table">
                    <div className='ion-padding pt-0 pb-0'>
                        <div className="content-main mt-1">
                            <h6>Pricing</h6>
                        </div>
                    </div>
                    <div className='mt-1 mb-1'>
                        <IonItemDivider className="category-divider">
                            <IonRow className="ion-align-items-center ion-justify-content-between p-0 mt- w-100">
                                <IonCol
                                    size="4"
                                    className='text-left'
                                >
                                    <p className='p-0 m-0 font-normal'><code>MRP</code></p>
                                </IonCol>
                                <IonCol
                                    size="8"
                                    className='text-right'
                                >
                                    <p className='p-0 m-0 font-normal'>&#8377; {product.price}</p>
                                </IonCol>
                            </IonRow>
                        </IonItemDivider>
                        <IonItemDivider className="category-divider">
                            <IonRow className="ion-align-items-center ion-justify-content-between p-0 mt- w-100">
                                <IonCol
                                    size="4"
                                    className='text-left'
                                >
                                    <p className='p-0 m-0 font-normal'><code>Discount</code></p>
                                </IonCol>
                                <IonCol
                                    size="8"
                                    className='text-right'
                                >
                                    <p className='p-0 m-0 font-normal'>{product.discount}%</p>
                                </IonCol>
                            </IonRow>
                        </IonItemDivider>
                        <IonItemDivider className="category-divider category-divider-end">
                            <IonRow className="ion-align-items-center ion-justify-content-between p-0 mt- w-100">
                                <IonCol
                                    size="4"
                                    className='text-left'
                                >
                                    <p className='p-0 m-0 font-normal'><code>Our Price</code></p>
                                </IonCol>
                                <IonCol
                                    size="8"
                                    className='text-right'
                                >
                                    <p className='p-0 m-0 font-normal'><b>&#8377; {product.discounted_price}</b></p>
                                </IonCol>
                            </IonRow>
                        </IonItemDivider>
                    </div>
                    
                </IonCard>
                
                <CheckPincode slug={match.params.slug} />

                <Review reviews={product.reviews} product_id={product.id} />
                
                <MainFooter />
                <div className="fixed-spacing-2"></div>
                <IonItemDivider className="cart-divider-total" slot="fixed">
                    <IonRow className="ion-align-items-center ion-justify-content-between p-0 w-100">
                        <IonCol
                            size="4"
                            className='text-left'
                        >
                            <IonText color="dark">
                                <h4 className="m-0"><b>&#8377;{product?.discounted_price}</b></h4>
                            </IonText>
                        </IonCol>
                        <IonCol
                            size="4"
                            className='text-right'
                        >
                            <CartQuantityMain quantity={cart ? (cart.products.filter(item => item.id===product.id).length>0 ? cart.products.filter(item => item.id===product.id)[0].quantity : 0) : 0} loading={loading} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} />
                        </IonCol>
                    </IonRow>
                </IonItemDivider>
            </>)
            }
        </IonContent>
      </IonPage>
    );
  };
  
export default ProductDetail;