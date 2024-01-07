import ReviewItem from "../ReviewItem";
import { ProductReviewState } from "../../helper/types";
import ReviewForm from "./ReviewForm";
import { IonButton } from "@ionic/react";
import { useState } from "react";

type Props = {
    reviews: ProductReviewState[],
    product_id: number
}

const Review: React.FC<Props> = ({product_id, reviews}) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
      <div className="product-detail-main-specification">
        <div className="page-padding product-detail-main-content-heading">
            <h6>Reviews</h6>
        </div>
        <div className="page-padding">
            {reviews.length > 0 ? <div className="mb-1">
                {reviews.map((item, i) => <ReviewItem {...item} key={i} />)}
            </div> : <div className="text-center">
                <p>No Reviews Available.</p>
            </div>}
            <div className="text-center">
                <IonButton
                    color="success"
                    type="submit"
                    mode="md"
                    size='default'
                    className="login-button"
                    onClick={()=>setIsOpen(true)}
                >
                    Add Review
                </IonButton>
            </div>
        </div>
        <ReviewForm isOpen={isOpen} setIsOpen={setIsOpen} product_id={product_id} />
      </div>
    );
}

export default Review;