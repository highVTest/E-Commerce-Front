// // eslint-disable-next-line react/prop-types
// import {useState} from "react";
//
// import {Container, Button, Rating, Textarea, Title} from "@mantine/core";
//
// // eslint-disable-next-line react/prop-types
// const ReviewForm = ({ onSubmit }) => {
//     const [content, setContent] = useState('');
//     const [rating, setRating] = useState(0);
//
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         onSubmit({ content, rating });
//         setContent('');
//         setRating(0);
//     };
//
//     return (
//         <Container>
//             <Title order={2}>Write a Review</Title>
//             <form onSubmit={handleSubmit}>
//                 <Rating value={rating} onChange={setRating} />
//                 <Textarea
//                     value={content}
//                     onChange={(event) => setContent(event.currentTarget.value)}
//                     placeholder="Write your review here"
//                     minRows={4}
//                 />
//                 <Button type="submit">Submit</Button>
//             </form>
//         </Container>
//     );
// };

// export default ReviewForm;