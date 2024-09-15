// src/components/UserPicker.jsx
import React from 'react';
import { Button, Typography } from 'antd';

const { Title } = Typography;

const UserPicker = ({ selectedSlots, onConfirm }) => {
    return (
        <div className="user-picker" style={{ width: '100%', textAlign: 'center' }}>
            <Title level={4}>Your Availability</Title>
            <div className="selected-slots" style={{ minHeight: 100, marginBottom: 20 }}>
                {selectedSlots.length > 0
                    ? selectedSlots.join(', ')
                    : 'No slots selected'}
            </div>
            <Button type="primary" onClick={onConfirm} disabled={selectedSlots.length === 0}>
                Confirm
            </Button>
        </div>
    );
};

export default UserPicker;