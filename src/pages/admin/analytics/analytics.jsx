// import React, { useState } from 'react';
// import { Container, Row, Col, Card, Dropdown, ButtonGroup, Button, ProgressBar, Image } from 'react-bootstrap';
// import { Bar, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
// import uvaWellassaImage from '../../../assets/neaby-university/uwu.jpg';
// import jaffnaImage from  '../../../assets/neaby-university/uwu.jpg';
// import colomboImage from  '../../../assets/neaby-university/uwu.jpg';
import './analytics.css';

import React, { useState } from 'react';
import { Container, Row, Col, Card, Dropdown, ButtonGroup, Button, ProgressBar, Image } from 'react-bootstrap';
import { Bar, Line } from 'react-chartjs-2';
import uvaWellassaImage from '../../../assets/neaby-university/uwu.jpg'; // Adjust the image paths as needed
import jaffnaImage from  '../../../assets/neaby-university/uwu.jpg';
import colomboImage from  '../../../assets/neaby-university/uwu.jpg';
import './analytics.css';

const Analytics = () => {
    const [bookingPeriod, setBookingPeriod] = useState('Month');
    const [engagementPeriod, setEngagementPeriod] = useState('Month');

    const monthlyBookingData = {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [
            {
                label: 'Bookings',
                data: [200, 300, 250, 280, 300, 320, 180, 200, 240, 300, 400, 420],
                backgroundColor: '#024950',
            },
        ],
    };

    const yearlyBookingData = {
        labels: ['2020', '2021', '2022', '2023'],
        datasets: [
            {
                label: 'Bookings',
                data: [2400, 2900, 3200, 3600],
                backgroundColor: '#024950',
            },
        ],
    };

    const dailyEngagementData = {
        labels: Array.from({ length: 31 }, (_, i) => `Jan ${i + 1}`),
        datasets: [
            {
                label: 'Engagement',
                data: [50000, 60000, 55000, 58000, 60000, 62000, 48000, 50000, 54000, 60000, 80000, 82000, 72000, 70000, 68000, 66000, 70000, 72000, 75000, 80000, 85000, 87000, 88000, 89000, 92000, 95000, 96000, 98000, 100000, 150000, 200000],
                backgroundColor: 'rgba(2, 73, 80, 0.2)',
                borderColor: 'rgba(2, 73, 80, 1)',
                fill: true,
            },
        ],
    };

    const monthlyEngagementData = {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [
            {
                label: 'Engagement',
                data: [1000000, 1200000, 1100000, 1150000, 1200000, 1240000, 960000, 1000000, 1080000, 1200000, 1600000, 1680000],
                backgroundColor: 'rgba(2, 73, 80, 0.2)',
                borderColor: 'rgba(2, 73, 80, 1)',
                fill: true,
            },
        ],
    };

    const yearlyEngagementData = {
        labels: ['2020', '2021', '2022', '2023'],
        datasets: [
            {
                label: 'Engagement',
                data: [12000000, 14000000, 15000000, 18000000],
                backgroundColor: 'rgba(2, 73, 80, 0.2)',
                borderColor: 'rgba(2, 73, 80, 1)',
                fill: true,
            },
        ],
    };

    const topUniversities = [
        {
            name: 'Uva Wellassa University',
            percentage: 95,
            image: uvaWellassaImage,
        },
        {
            name: 'University of Jaffna',
            percentage: 92,
            image: jaffnaImage,
        },
        {
            name: 'University of Colombo',
            percentage: 89,
            image: colomboImage,
        },
    ];

    const handleBookingPeriodChange = (period) => {
        setBookingPeriod(period);
    };

    const handleEngagementPeriodChange = (period) => {
        setEngagementPeriod(period);
    };

    const getBookingData = () => {
        switch (bookingPeriod) {
            case 'Year':
                return yearlyBookingData;
            case 'Month':
            default:
                return monthlyBookingData;
        }
    };

    const getEngagementData = () => {
        switch (engagementPeriod) {
            case 'Year':
                return yearlyEngagementData;
            case 'Month':
                return monthlyEngagementData;
            case 'Day':
            default:
                return dailyEngagementData;
        }
    };

    return (
        <Container className="analytics-container">
            <Row className="mb-4">
                <Col md={8}>
                    <Card className="analytics-card">
                        <Card.Header className="analytics-card-header">
                            <Row>
                                <Col>Boarding Booking graph for every {bookingPeriod}</Col>
                                <Col className="text-end">
                                    <Dropdown as={ButtonGroup}>
                                        <Button variant="outline-secondary">{bookingPeriod}</Button>
                                        <Dropdown.Toggle split variant="outline-secondary" id="dropdown-split-basic" />
                                        <Dropdown.Menu>
                                            <Dropdown.Item className="custom-dropdown-item" onClick={() => handleBookingPeriodChange('Month')}>Month</Dropdown.Item>
                                            <Dropdown.Item className="custom-dropdown-item" onClick={() => handleBookingPeriodChange('Year')}>Year</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body className="analytics-card-body">
                            <Bar data={getBookingData()} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="analytics-card">
                        <Card.Header className="analytics-card-header">Top Universities</Card.Header>
                        <Card.Body className="analytics-card-body">
                            {topUniversities.map((university, index) => (
                                <div key={index} className="mb-3">
                                    <Row>
                                        <Col xs={2}>
                                            <Image src={university.image} fluid className="analytics-image-rounded" />
                                        </Col>
                                        <Col xs={10}>
                                            <div className="d-flex flex-column">
                                                <p className="mb-1">{university.name}</p>
                                                <div className="d-flex align-items-center">
                                                    <ProgressBar
                                                        now={university.percentage}
                                                        label={`${university.percentage}%`}
                                                        className="analytics-progress-bar custom-progress-bar flex-grow-1 me-2 no-margin-bottom"
                                                    />
                                                    <p className="mb-1  uni-percentage">{university.percentage}% <span className="correct">Correct</span></p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="analytics-card">
                        <Card.Header className="analytics-card-header">
                            <Row>
                                <Col>Users Engagement</Col>
                                <Col className="text-end">
                                    <ButtonGroup className="analytics-button-group">
                                        <Button className={`analytics-button ${engagementPeriod === 'Day' ? 'active' : ''}`} onClick={() => handleEngagementPeriodChange('Day')}>Day</Button>
                                        <Button className={`analytics-button ${engagementPeriod === 'Month' ? 'active' : ''}`} onClick={() => handleEngagementPeriodChange('Month')}>Month</Button>
                                        <Button className={`analytics-button ${engagementPeriod === 'Year' ? 'active' : ''}`} onClick={() => handleEngagementPeriodChange('Year')}>Year</Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body className="analytics-card-body">
                            <Line data={getEngagementData()} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Analytics;
