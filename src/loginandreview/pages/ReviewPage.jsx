
// import {useState} from "react";
// import {Title,Container} from "@mantine/core";
// import ReviewForm from "../components/review/ReviewForm.jsx";
//
// const ReviewPage = () => {
//     const [reviews, setReviews] = useState([]);
//
//     const handleReviewSubmit = (review) => {
//         setReviews([...reviews, { ...review, id: Date.now() }]);
//     };
//
//     return (
//         <Container>
//             <Title style={{textAlign: "center"}} order={1}>Review Page</Title>
//             <ReviewForm onSubmit={handleReviewSubmit} />
//
//         </Container>
//     );
// };
//
// export default ReviewPage;

import ReviewList from "../../loginandreview/components/ReviewList.jsx";

const ReviewPage = () => {
    return(
        <div>
            <ReviewList />
        </div>
    );
};

export default ReviewPage;