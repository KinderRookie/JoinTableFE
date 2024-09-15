import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Title level={2}>404 - Page Not Found</Title>
            <Paragraph>The page you are looking for does not exist.</Paragraph>
            <Button type="primary" onClick={() => navigate('/')}>Go Home</Button>
        </div>
    );
};

export default NotFound;