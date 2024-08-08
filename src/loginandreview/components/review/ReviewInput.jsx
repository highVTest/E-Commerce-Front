import {useState} from "react";
import {Button, TextInput} from "@mantine/core";

const ReviewInput = ({addReview}) => {
    const [title, setTitle] = useState("");

    const handleSubmit = async () => {

        await addReview({
            // id: Math.floor(Math.random() *100),
            title: title,
            userId: 1,
            completed: false,
        });

        alert("리뷰 추가 완료!");


    };
    return(
        <>
        <TextInput
            type = "text"
            name = "title"
            value={title}
            onChange={(e) =>setTitle (e.target.value)}
            />


            <Button onClick={handleSubmit} style={{marginTop:"10px"}}> 리뷰 추가하기</Button>


    </>
);
};

export default ReviewInput;