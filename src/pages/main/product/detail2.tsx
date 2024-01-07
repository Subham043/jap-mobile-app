import { IonPage, IonContent, ScrollDetail, IonButton, IonCol, IonIcon, IonItemDivider, IonRow, IonText, IonSpinner, IonRefresher, IonRefresherContent, RefresherEventDetail, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import {axiosPublic} from '../../../../axios';
import { api_routes } from '../../../helper/routes';
import { useCallback, useRef, useState } from 'react';
import MainFooter from '../../../components/MainFooter';
import { bookmarkOutline } from 'ionicons/icons';
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
import CheckPincode2 from '../../../components/CheckPincode/CheckPincode2';

const fetcher = (url: string) => axiosPublic.get(url).then((res) => res.data.product);

interface ProductProps extends RouteComponentProps<{
    slug: string;
}> {}

const ProductDetail2: React.FC<ProductProps> = ({match}) => {

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

    const handleScroll = useCallback((ev: CustomEvent<ScrollDetail>) => ev.detail.scrollTop>=((ref && ref.current) ? ref?.current?.offsetTop : 475) ? setShowSubHeader(true) : setShowSubHeader(false), [])

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
        <IonHeader mode='ios' translucent={false} className=''>
            <IonToolbar className='main-header-background'>
              <IonButtons slot="start">
                <IonBackButton defaultHref='/products' color='success'></IonBackButton>
              </IonButtons>
              {showSubHeader && <IonTitle>{product?.name}</IonTitle>}
              {product && <IonButtons slot="end">
                    {
                        wishlistLoading ? <IonSpinner name="dots" color={'success'}></IonSpinner> : 
                        (wishlist && <IonButton className="" fill='clear' disabled={wishlistLoading} color={[...wishlist.products.map(item => item.id)].indexOf(product.id)<0 ? "success" : "danger"} onClick={()=>wishlistHandler(product.id)}>
                            {[...wishlist.products.map(item => item.id)].indexOf(product.id)<0 ? 'wishlist' : 'remove'}
                            <IonIcon slot="end" icon={bookmarkOutline}></IonIcon>
                        </IonButton>)
                    }
              </IonButtons>}
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

            {productLoading ? <>
                <LoadingDetail />
                <LoadingPricingTable />
                <LoadingPricingTable />
            </> : 
            (product && <>
                <div style={{width:'100%', backgroundColor:'#fff'}} className='product-detail-main-img-container'>
                    <Slider images={[product.featured_image_link? product.featured_image_link : '', ...product.other_images.map(item=>item.image_link ? item.image_link : '')]} />
                </div>
                <div ref={ref} className='page-padding pt-0 pb-0'>
                    <div className="content-main">
                        <h1>{product.name}</h1>
                    </div>
                </div>
                {product.description && <div className='page-padding pt-0'>
                    <div className="content-main">
                        <p className='mb-0'>{product.description}</p>
                    </div>
                </div>}

                <div className="mt-2">
                    <div className="product-detail-main-specification">
                        <div className="page-padding product-detail-main-content-heading">
                            <h6>Specification</h6>
                        </div>

                        <div className="page-padding cart-pricing-main-table">
                            <table className="w-100">
                                <thead className="w-100">
                                    <tr className="w-100">
                                        <td className="text-left tr-price">In Stock</td>
                                        <td className="text-right tr-price">{product.in_stock ? 'Yes' : 'No'}</td>
                                    </tr>
                                    <tr className="w-100">
                                        <td className="text-left tr-price">Items Left</td>
                                        <td className="text-right tr-price">{product.inventory}</td>
                                    </tr>
                                    <tr className="w-100">
                                        <td className="text-left tr-price">Size Unit</td>
                                        <td className="text-right tr-price">{product.weight}</td>
                                    </tr>
                                    {product.categories.length>0 && <tr className="w-100">
                                        <td className="text-left tr-price">Category</td>
                                        <td className="text-right tr-price">{product.categories.map((item)=>item.name).join(', ')}</td>
                                    </tr>}
                                </thead>
                            </table>
                        </div>
                    </div>
                    <CheckPincode2 slug={match.params.slug} />
                    <div className="product-detail-main-specification">
                        <div className="page-padding product-detail-main-content-heading">
                            <h6>Pricing Information</h6>
                        </div>

                        <div className="page-padding cart-pricing-main-table">
                            <table className="w-100">
                                <thead className="w-100">
                                    <tr className="w-100">
                                        <td className="text-left tr-price">Price</td>
                                        <td className="text-right tr-price">&#8377;{product.price} / {product.weight}</td>
                                    </tr>
                                    <tr className="w-100">
                                        <td className="text-left tr-price">Discount</td>
                                        <td className="text-right tr-price">{product.discount}%</td>
                                    </tr>
                                    <tr className="w-100">
                                        <td className="text-left tr-price">Our Price</td>
                                        <td className="text-right tr-price">&#8377;{product.discounted_price} / {product.weight}</td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <Review reviews={product.reviews} product_id={product.id} />
                </div>

                
                <MainFooter />
                <div className="fixed-spacing-2"></div>
                <IonItemDivider className="cart-divider-total cart-divider-total-main" slot="fixed">
                    <IonRow className="ion-align-items-center ion-justify-content-between p-0 w-100">
                        <IonCol
                            size="6"
                            className='text-left'
                        >
                            <IonText color="dark">
                                <h4 className="m-0"><b>&#8377;{product.discounted_price} / {product.weight}</b></h4>
                            </IonText>
                        </IonCol>
                        <IonCol
                            size="6"
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
  
export default ProductDetail2;