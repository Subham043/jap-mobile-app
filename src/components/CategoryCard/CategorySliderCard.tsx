import { IonCard, IonCardHeader, IonImg, IonText } from "@ionic/react";
import { Link } from "react-router-dom";
import './CategoryCard.css';

export type Props = {
    name: string,
    link: string,
    image?: string,
};

const CategorySliderCard: React.FC<Props> = ({image, name, link}) => {
    return <Link className="no-underline w-100" to={link}>
        <IonCard className="category-card">
            <IonImg alt="category" src={image} class="category-card-image" />
            <IonCardHeader className="category-card-header">
                <IonText color="dark">
                    <p className="category-card-text">{name}</p>
                </IonText>
            </IonCardHeader>
        </IonCard>
    </Link>
}

export default CategorySliderCard;