import {Button, Typography} from "antd";
import React from 'react';
import {useNavigate} from "react-router-dom";
const { Title, Paragraph, Text} = Typography;


const HomePage = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/app")
    }
    return (
        <div>
            <Typography >
                <Title>JoinTable</Title>
                <Paragraph>
                    <Text strong>
                        JoinTable
                    </Text>
                    은 여러명의 사용자의 스케쥴을 모아 시간표로 배정하는 웹 어플리케이션입니다.
                </Paragraph>
            </Typography>
            <Button onClick={handleButtonClick}>Goto App</Button>

        </div>
    );
}
export default HomePage;