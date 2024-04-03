import React, { useState, ChangeEvent } from "react";
import { Box, Heading, Button, useToast } from "@chakra-ui/react";
import { uploadCV } from "services/api/user";
import { FaDownload } from "react-icons/fa";

interface CVDropzoneProps {
    userId: number;
}

const CVDropzone: React.FC<CVDropzoneProps> = ({ userId }) => {
    const [cvFile, setCVFile] = useState<File | null>(null);
    const toast = useToast();

    const handleCVUpload = async () => {
        try {
            if (cvFile) {
                await uploadCV(userId, cvFile, cvFile.name);
                toast({
                    title: "CV Uploaded",
                    description: "Your CV has been uploaded successfully.",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "No CV Selected",
                    description: "Please select a CV file to upload.",
                    status: "warning",
                    duration: 4000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error("Failed to upload CV:", error);
            toast({
                title: "Failed to Upload CV",
                description: "An error occurred while uploading your CV. Please try again.",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setCVFile(event.target.files[0]);
        }
    };

    return (
        <>
            <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
                <Heading size="md" mb={2}>Upload CV</Heading>
                <input type="file" onChange={handleFileChange} />
                <Button mt={2} colorScheme="blue" onClick={handleCVUpload}>Upload</Button>
            </Box>
        </>

    );
};

export default CVDropzone;