// src/components/GatheredData.jsx
import React from 'react';
import { Table, Tooltip } from 'antd';

const GatheredData = ({ dates, timeUnits, gatheredData }) => {
    const columns = [
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            fixed: 'left',
            width: 100,
        },
        ...dates.map((date) => ({
            title: date,
            dataIndex: date,
            key: date,
            render: (text, record) => {
                const gathered = gatheredData[`${record.time}-${date}`] || [];
                const count = gathered.length;

                return (
                    <Tooltip
                        title={count > 0 ? `Users: ${gathered.join(', ')}` : ''}
                        placement="top"
                    >
                        <div
                            style={{
                                width: 50,
                                height: 30,
                                backgroundColor: count > 0 ? '#52c41a' : 'transparent',
                                border: '1px solid #ccc',
                            }}
                        ></div>
                    </Tooltip>
                );
            },
        })),
    ];

    const data = timeUnits.map((time) => ({
        key: time,
        time: time,
        ...dates.reduce((acc, date) => {
            acc[date] = null;
            return acc;
        }, {}),
    }));

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            scroll={{ x: dates.length * 60 }}
            bordered
        />
    );
};

export default GatheredData;