import { IonItem, IonLabel, IonSkeletonText } from "@ionic/react";

const LoadingOrderCard: React.FC = () => {
    return (
        <>
            <IonItem lines="full" detail={true}>
                <IonLabel>
                    <h3><IonSkeletonText animated={true} style={{ width: '70%', marginRight: 'auto' }}></IonSkeletonText></h3>
                    <p><IonSkeletonText animated={true} style={{ width: '90%', marginRight: 'auto' }}></IonSkeletonText></p>
                    <p><IonSkeletonText animated={true} style={{ width: '90%', marginRight: 'auto' }}></IonSkeletonText></p>
                    <p><IonSkeletonText animated={true} style={{ width: '90%', marginRight: 'auto' }}></IonSkeletonText></p>
                    <p><IonSkeletonText animated={true} style={{ width: '90%', marginRight: 'auto' }}></IonSkeletonText></p>
                </IonLabel>
            </IonItem>
            <IonItem lines="full" detail={true}>
                <IonLabel>
                    <h3><IonSkeletonText animated={true} style={{ width: '70%', marginRight: 'auto' }}></IonSkeletonText></h3>
                    <p><IonSkeletonText animated={true} style={{ width: '90%', marginRight: 'auto' }}></IonSkeletonText></p>
                    <p><IonSkeletonText animated={true} style={{ width: '90%', marginRight: 'auto' }}></IonSkeletonText></p>
                    <p><IonSkeletonText animated={true} style={{ width: '90%', marginRight: 'auto' }}></IonSkeletonText></p>
                    <p><IonSkeletonText animated={true} style={{ width: '90%', marginRight: 'auto' }}></IonSkeletonText></p>
                </IonLabel>
            </IonItem>
            <IonItem lines="full" detail={true}>
                <IonLabel>
                    <h3><IonSkeletonText animated={true} style={{ width: '70%', marginRight: 'auto' }}></IonSkeletonText></h3>
                    <p><IonSkeletonText animated={true} style={{ width: '90%', marginRight: 'auto' }}></IonSkeletonText></p>
                    <p><IonSkeletonText animated={true} style={{ width: '90%', marginRight: 'auto' }}></IonSkeletonText></p>
                    <p><IonSkeletonText animated={true} style={{ width: '90%', marginRight: 'auto' }}></IonSkeletonText></p>
                    <p><IonSkeletonText animated={true} style={{ width: '90%', marginRight: 'auto' }}></IonSkeletonText></p>
                </IonLabel>
            </IonItem>
            <IonItem lines="full" detail={true}>
                <IonLabel>
                    <h3><IonSkeletonText animated={true} style={{ width: '70%', marginRight: 'auto' }}></IonSkeletonText></h3>
                    <p><IonSkeletonText animated={true} style={{ width: '90%', marginRight: 'auto' }}></IonSkeletonText></p>
                    <p><IonSkeletonText animated={true} style={{ width: '90%', marginRight: 'auto' }}></IonSkeletonText></p>
                    <p><IonSkeletonText animated={true} style={{ width: '90%', marginRight: 'auto' }}></IonSkeletonText></p>
                    <p><IonSkeletonText animated={true} style={{ width: '90%', marginRight: 'auto' }}></IonSkeletonText></p>
                </IonLabel>
            </IonItem>
        </>
    );
}

export default LoadingOrderCard;