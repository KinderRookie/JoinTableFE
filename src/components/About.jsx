import {Button, Typography} from "antd";
import React from 'react';
const { Title, Paragraph, Text} = Typography;


const About = () => {

    const handleSendEmailClick = () => {
        window.location.href = "mailto:popatry13@gmail.com"; // Replace with your email
    };

    const handleLinkedInClick = () => {
        window.open("https://www.linkedin.com/in/sangraekim/", "_blank");
    }



    return (
        <div>
            <Typography>
                <Title>만든 사람</Title>
                <Paragraph>
                    <Text strong>
                        김상래
                    </Text>
                    : Frontend: React, Backend: FastAPI, DB: MongoDB
                </Paragraph>
            </Typography>
            <Button type="default" onClick={handleSendEmailClick}>
                Send Email
            </Button>
            <Button type="default" style={{ marginLeft: 10 }} onClick={handleLinkedInClick}>
                LinkedIn
            </Button>



        </div>
    );
}
export default About;