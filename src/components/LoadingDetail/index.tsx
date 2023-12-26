import { IonSkeletonText, IonThumbnail } from "@ionic/react";

const LoadingDetail: React.FC = () => {
    return (
        <>
            <IonThumbnail style={{ width: '100%', height: '200px' }}>
                <IonSkeletonText animated={true} style={{ width: '100%' }}></IonSkeletonText>
            </IonThumbnail>
            <div className='content-main ion-padding pt-10'>
                <h1>
                    <IonSkeletonText animated={true} style={{ width: '60%', marginLeft: 'auto', marginRight: 'auto' }}></IonSkeletonText>
                </h1>
                <p>
                    <IonSkeletonText animated={true} style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto' }}></IonSkeletonText>
                    <IonSkeletonText animated={true} style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto' }}></IonSkeletonText>
                    <IonSkeletonText animated={true} style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto' }}></IonSkeletonText>
                    <IonSkeletonText animated={true} style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto' }}></IonSkeletonText>
                    <IonSkeletonText animated={true} style={{ width: '50%', marginRight: 'auto' }}></IonSkeletonText>
                </p>
            </div>
        </>

    );
}

export default LoadingDetail;