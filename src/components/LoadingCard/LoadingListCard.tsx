import { IonCard, IonCol, IonGrid, IonRow, IonSkeletonText, IonThumbnail } from "@ionic/react";

const arr = [1,2,3,4]
const LoadingListCard: React.FC = () => {
    return (
        <IonGrid className="mt-1 p-0">
            <IonRow className="ion-align-items-center ion-justify-content-between p-0">
                {
                    arr.map(item => <IonCol
                        size="12"
                        size-xl="12"
                        size-lg="12"
                        size-md="12"
                        size-sm="12"
                        size-xs="12" className='p-0' key={item}
                    >
                        <IonCard className='m-1 p-0 product-card'>
                            <div className='product-img-container'>
                                <IonThumbnail style={{ width: '100%', height: '100px' }}>
                                    <IonSkeletonText animated={true} style={{ width: '100%' }}></IonSkeletonText>
                                </IonThumbnail>
                            </div>
                        </IonCard>
                    </IonCol>)
                }
            </IonRow>
        </IonGrid>

    );
}

export default LoadingListCard;