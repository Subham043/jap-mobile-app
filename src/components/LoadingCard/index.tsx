import { IonCard, IonCardHeader, IonCol, IonGrid, IonImg, IonRow, IonSkeletonText, IonText, IonThumbnail } from "@ionic/react";

const arr = [1,2,3,4]
const LoadingCard: React.FC = () => {
    return (
        <IonGrid className="mt-1 p-0">
            <IonRow className="ion-align-items-center ion-justify-content-between p-0">
                {
                    arr.map(item => <IonCol
                        size="6"
                        size-xl="3"
                        size-lg="3"
                        size-md="4"
                        size-sm="6"
                        size-xs="6" className='p-0' key={item}
                    >
                        <IonCard className='m-1 p-0 product-card'>
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
                    </IonCol>)
                }
            </IonRow>
        </IonGrid>

    );
}

export default LoadingCard;