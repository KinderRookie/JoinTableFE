// src/pages/EventPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Spin, Row, Col } from 'antd';
import { toast } from 'react-toastify';
import AuthForm from '../components/AuthForm';
import TimeTable from '../components/TimeTable';
import UserPicker from '../components/UserPicker';
import GatheredData from '../components/GatheredData';

const { Title } = Typography;

const Events = () => {
    const { eventUuid } = useParams();
    const navigate = useNavigate();
    const [eventData, setEventData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null); // Authenticated user
    const [userSelections, setUserSelections] = useState([]);
    const [gatheredData, setGatheredData] = useState({});

    // Fetch event details
    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/event/${eventUuid}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setEventData(data);
                } else {
                    console.error('Error fetching event:', response.statusText);
                    toast.error('Failed to load event. Redirecting...', {
                        position: 'bottom-right',
                        autoClose: 3000,
                    });
                    setTimeout(() => {
                        navigate('*', { replace: true });
                    }, 3000);
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Error loading event. Redirecting...', {
                    position: 'bottom-right',
                    autoClose: 3000,
                });
                setTimeout(() => {
                    navigate('*', { replace: true });
                }, 3000);
            } finally {
                setLoading(false);
            }
        };

        fetchEventData();
    }, [eventUuid, navigate]);

    // Fetch gathered data
    useEffect(() => {
        const fetchGatheredData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/event/${eventUuid}/gathered`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setGatheredData(data);
                } else {
                    console.error('Error fetching gathered data:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (eventData) {
            fetchGatheredData();
        }
    }, [eventData, eventUuid]);

    const handleAuthSuccess = (userData) => {
        setUser(userData);
        // Optionally, fetch user's existing selections
        fetchUserSelections(userData.id);
    };

    const fetchUserSelections = async (userId) => {
        try {
            const response = await fetch(
                `http://localhost:8000/event/${eventUuid}/user/${userId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                setUserSelections(data.selections || []);
            } else {
                console.error('Error fetching user selections:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCellSelect = (cellId) => {
        setUserSelections((prevSelections) => {
            if (prevSelections.includes(cellId)) {
                // Deselect
                return prevSelections.filter((id) => id !== cellId);
            } else {
                // Select
                return [...prevSelections, cellId];
            }
        });
    };

    const handleConfirm = async () => {
        if (!user) {
            toast.error('Please login or register first.', {
                position: 'bottom-right',
                autoClose: 3000,
            });
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8000/event/${eventUuid}/user/${user.id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ selections: userSelections }),
                }
            );

            if (response.ok) {
                toast.success('Your availability has been updated!', {
                    position: 'bottom-right',
                    autoClose: 3000,
                });
                // Refresh gathered data
                const gatheredResponse = await fetch(
                    `http://localhost:8000/event/${eventUuid}/gathered`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                if (gatheredResponse.ok) {
                    const gathered = await gatheredResponse.json();
                    setGatheredData(gathered);
                }
            } else {
                const data = await response.json();
                toast.error(data.message || 'Failed to update availability.', {
                    position: 'bottom-right',
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error updating availability. Please try again.', {
                position: 'bottom-right',
                autoClose: 3000,
            });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (!eventData) {
        return null; // Redirect is handled in useEffect
    }

    const { dates, timeUnit, earliestTime, latestTime } = eventData;

    // Generate time units based on event data
    // Assuming timeUnit is in minutes and earliestTime/latestTime are strings like "09:00"
    const generateTimeSlots = () => {
        const slots = [];
        const [startHour, startMinute] = earliestTime.split(':').map(Number);
        const [endHour, endMinute] = latestTime.split(':').map(Number);
        let current = new Date();
        current.setHours(startHour, startMinute, 0, 0);
        const end = new Date();
        end.setHours(endHour, endMinute, 0, 0);

        while (current <= end) {
            const hours = current.getHours().toString().padStart(2, '0');
            const minutes = current.getMinutes().toString().padStart(2, '0');
            slots.push(`${hours}:${minutes}`);
            current.setMinutes(current.getMinutes() + timeUnit);
        }

        return slots;
    };

    const timeSlots = generateTimeSlots();

    return (
        <div className="event-page p-4">
            <Title level={2}>{eventData.eventName}</Title>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={6}>
                    {!user ? (
                        <AuthForm onAuthSuccess={handleAuthSuccess} />
                    ) : (
                        <UserPicker
                            selectedSlots={userSelections}
                            onConfirm={handleConfirm}
                        />
                    )}
                </Col>
                <Col xs={24} md={18}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Title level={4}>Select Your Availability</Title>
                            <TimeTable
                                dates={dates}
                                timeUnits={timeSlots}
                                userSelections={userSelections}
                                onCellSelect={handleCellSelect}
                                gatheredData={gatheredData}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <Title level={4}>Gathered Availability</Title>
                            <GatheredData
                                dates={dates}
                                timeUnits={timeSlots}
                                gatheredData={gatheredData}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Events;