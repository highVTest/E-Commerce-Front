import {useEffect, useState} from "react";
import {getProductReviews} from "../../api/v1/review/review.js";

const ReviewList = () => {
const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const data = await getProductReviews();

            setReviews(data);
        };
        fetchReviews();
    }, []);
    return <div>
        ReviewList
    </div>
};

export default ReviewList;