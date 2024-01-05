import { IonCard, IonCardHeader, IonSkeletonText, IonText, IonThumbnail } from "@ionic/react";

const LoadingCard2: React.FC = () => {
    return (
        <IonCard className='m-1 p-0 product-card w-100'>
            <div className='product-img-container'>
                <IonThumbnail style={{ width: '100%', height: '200px' }}>
                    <IonSkeletonText animated={true} style={{ width: '100%' }}></IonSkeletonText>
                </IonThumbnail>
            </div>
            <IonCardHeader className='p-10'>
                <IonText color="success" className='text-center'>
                    <h5 className='p-0 m-0 text-capitalize'>
                        <IonSkeletonText animated={true} style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto' }}></IonSkeletonText>
                    </h5>
                </IonText>
                <IonText className='text-center'>
                    <p className='p-0 m-0'>
                        <IonSkeletonText animated={true} style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}></IonSkeletonText>
                    </p>
                </IonText>
            </IonCardHeader>
            <div className="text-center mb-1">
                <IonSkeletonText animated={true} style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}></IonSkeletonText>
            </div>
        </IonCard>

    );
}

export default LoadingCard2;