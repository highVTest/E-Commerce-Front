

const ReviewList = ({reviews, removeReview, toggleReview}) => {

    return(
        <div>
            <h2>
                리뷰입니다
            </h2>
       <ul>
           {reviews.map((review) => (
               <li key={review.id}>
                   <p>id: {review.id}</p>
                   <p>productId: {review.productId}</p>
                   <p>completed: {review.complete ? "true" : "false"} </p>
                   <button
                   color="black" 
                   onClick={() =>
                       toggleReview({
                           ...review,
                           completed: !review.completed,
                       })
                   }
                   >
                   완료
               </button>

                   <button color="black" onClick={() => removeReview(review.id)}>삭제</button>
               </li>
           ))}
       </ul>
                 </div>
                );
               };

export default ReviewList