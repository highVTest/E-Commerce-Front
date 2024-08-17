import {Button, Image, SimpleGrid, Text} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useState } from "react";
import axios from "axios";
import {getPresignedUrl} from "../../api/upload.js";


const UploadPage = () => {
    const [files, setFiles] = useState([]);

    const handleUpload = async () => {
        //files 상태를 순회하며 presigned URL을 요청 후 해당 URL로 파일 업ㄹ로드

        files.forEach(async (file)=> {
            const presignedUrl = await getPresignedUrl(file.name);

            const response = await axios.put(presignedUrl, file,{
                headers: {
                    "Content-Type": file.type,
                },
            });
        });
    };


    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return (
            <Image
                key={index}
                src={imageUrl}
                onLoad={() => URL.revokeObjectURL(imageUrl)}
            />
        );
    });

    return (
        <section className="login-section">
            <div>
                <Dropzone
                    accept={IMAGE_MIME_TYPE}
                    onDrop={(files) => setFiles((prevState) => [...prevState, ...files])}
                >
                    <Text ta="center">Drop images here</Text>
                </Dropzone>

               <SimpleGrid
                   cols={{ base: 1, sm: 4}}
                   mt={previews.length> 0 ? "x1" : 0}
                   >
                   {previews}
               </SimpleGrid>
            </div>
            <Button variant="filled"  fullWidth onClick={handleUpload}>
                Upload
            </Button>
        </section>
    );
};

export default UploadPage;