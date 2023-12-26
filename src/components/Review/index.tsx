import ReviewItem from "../ReviewItem";
import { ProductReviewState } from "../../helper/types";
import ReviewForm from "./ReviewForm";

type Props = {
    reviews: ProductReviewState[],
    product_id: number
}

const Review: React.FC<Props> = ({product_id, reviews}) => {

    return (
      <>
        <ReviewForm product_id={product_id} />
        {reviews.length > 0 && <>
            <div className='ion-padding pt-1'>
                <div className="content-main">
                    <h6>Reviews</h6>
                </div>
            </div>
            <div className="mb-1">
                {reviews.map((item, i) => <ReviewItem {...item} key={i} />)}
            </div>
        </>}
      </>
    );
}

export default Review;