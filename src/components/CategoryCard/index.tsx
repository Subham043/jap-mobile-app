import { IonButton, IonCard, IonCardHeader, IonImg, IonSpinner, IonText } from "@ionic/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import './CategoryCard.css';

export type Props = {
    name: string,
    link: string,
    image?: string,
};

const CategoryCard: React.FC<Props> = ({image, name, link}) => {
    const [imgLoading, setImgLoading] = useState<boolean>(true);
    return <Link className="no-underline" to={link}>
        <IonCard className="category-card">
            {
                imgLoading &&
                <div className="text-center mt-1">
                    <IonSpinner color='success' />
                </div>
            }
            <IonImg alt="category" src={image} class="category-card-image" style={imgLoading ? {visibility: 'Hidden'}:{visibility: 'visible'}} onIonImgDidLoad={()=>setImgLoading(false)} />
            <IonCardHeader className="category-card-header">
                <IonText color="dark">
                    <p className="category-card-text">{name}</p>
                </IonText>
            </IonCardHeader>
        </IonCard>
    </Link>
}

export default CategoryCard;