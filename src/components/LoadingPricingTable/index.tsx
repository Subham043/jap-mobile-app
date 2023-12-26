import { IonCard, IonCol, IonItemDivider, IonRow, IonSkeletonText } from "@ionic/react";

const LoadingPricingTable: React.FC = () => {
    return (
        <>
            <IonCard className="final-table">
                    <div className='ion-padding pt-0 pb-0'>
                        <div className="content-main mt-1">
                            <h6><IonSkeletonText animated={true} style={{ width: '60%', marginLeft: 'auto', marginRight: 'auto' }}></IonSkeletonText></h6>
                        </div>
                    </div>
                    <div className='mt-1 mb-1'>
                        {[...Array(4)].map((e, i) =><IonItemDivider className="category-divider" key={i}>
                            <IonRow className="ion-align-items-center ion-justify-content-between p-0 mt- w-100">
                                <IonCol
                                    size="4"
                                    className='text-left'
                                >
                                    <p className='p-0 m-0 font-normal'><code><IonSkeletonText animated={true} style={{ width: '30%', marginLeft: 'auto', marginRight: 'auto' }}></IonSkeletonText></code></p>
                                </IonCol>
                                <IonCol
                                    size="8"
                                    className='text-right'
                                >
                                    <p className='p-0 m-0 font-normal'><IonSkeletonText animated={true} style={{ width: '30%', marginLeft: 'auto', marginRight: 'auto' }}></IonSkeletonText></p>
                                </IonCol>
                            </IonRow>
                        </IonItemDivider>)}
                    </div>
                    
                </IonCard>
        </>

    );
}

export default LoadingPricingTable;