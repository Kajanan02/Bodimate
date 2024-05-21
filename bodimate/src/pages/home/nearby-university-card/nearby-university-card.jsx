import React from 'react';

import './nearby-university-card.css';
import {Card, Col,Row} from "react-bootstrap";
import bording from "../../../assets/neaby-university/university.png";

const NearbyUniversityCard = () => {
    return (




                    <div k sm={12} md={6} lg={3} className="mb-4">
                        <Card className="d-flex flex-row">
                            <Card.Img src={bording} style={{width: '50%'}}/>
                            <Card.Body>
                                <Card.Title>University 1</Card.Title>
                                <Card.Text>15 minutes drive</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>



    );
};

export default NearbyUniversityCard;
