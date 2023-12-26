import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper/modules';
import { IonImg, IonSpinner } from '@ionic/react';
import { BannerImages } from '../../helper/types';
import { useState } from 'react';

const Slider: React.FC<BannerImages> = ({images}) => {
    const [imgLoading, setImgLoading] = useState<boolean>(true);
    return (
        <Swiper 
            modules={[Autoplay, Keyboard, Pagination, Scrollbar, Zoom]}
            autoplay={true}
            keyboard={true}
            pagination={{
              dynamicBullets: true,
            }}
            scrollbar={false}
            zoom={false}
          >
            {
              images.map((item, i) => <SwiperSlide key={i}>
                  {
                    imgLoading &&
                    <div className="text-center mt-1 w-100">
                        <IonSpinner color='success' />
                    </div>
                  }
                  <IonImg
                      src={item}
                      alt="Sliders"
                      style={imgLoading ? {visibility: 'Hidden', width: '100%'}:{visibility: 'visible', width: '100%'}} className="product-card-image" onIonImgDidLoad={()=>setImgLoading(false)}
                  ></IonImg>
              </SwiperSlide>)
            }
        </Swiper>
    );
}

export default Slider;