import React, { useState, useEffect } from "react";
import Wrapper from "../components/wrapper";
import { BsFillPeopleFill, BsFillHeartFill } from "react-icons/bs";
import { SiMicrosoftexcel } from "react-icons/si";
import { FaRegCalendarAlt } from "react-icons/fa";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'react-vis/dist/style.css';
import { XYPlot, LineSeries, XAxis, YAxis, HorizontalGridLines, VerticalGridLines } from 'react-vis';

const Index = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let user = useState(null);
    const [getUser, setUser] = useState(null);

    const data = [
        { x: 0, y: 8 },
        { x: 1, y: 5 },
        { x: 2, y: 4 },
        { x: 3, y: 9 },
        { x: 4, y: 9 },
        { x: 5, y: 7 },
        { x: 6, y: 6 },
        { x: 7, y: 3 },
        { x: 8, y: 2 },
        { x: 9, y: 9 }
    ];

    useEffect(async () => {
        user = window.api.getUser()
        setUser(user);
    }, getUser);

    return (
        <Wrapper title="Dashboard">

            <div className="d-flex align-items-center justify-content-start">
                <h1>Welcome, {getUser && getUser.Username}!</h1>
                <div className="mx-3">
                    <Button variant="link" onClick={handleShow}>
                        Show recent activities
                    </Button>
                </div>
            </div>

            <Offcanvas show={show} placement="end" onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Recent Activities</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>

            <div className="row pt-5">
                <div className="col-12">
                    <div className="row">
                        <div className="col-3 text-center">
                            <Card className="p-3">
                                <SiMicrosoftexcel size={70} className="w-100" />
                                <Card.Body>
                                    <Card.Title>Reports</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                    <Card.Link className="btn btn-success" href="/reports">Generate</Card.Link>
                                </Card.Body>
                            </Card>

                        </div>
                        <div className="col-3 text-center">
                            <Card className="p-3">
                                <BsFillPeopleFill size={70} className="w-100" />
                                <Card.Body>
                                    <Card.Title>Members</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                    <Card.Link className="btn btn-dark" href="/members">View</Card.Link>
                                    <Card.Link className="btn btn-success" href="/member/add">Add new</Card.Link>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-3 text-center">
                            <Card className="p-3">
                                <BsFillHeartFill size={70} className="w-100" />
                                <Card.Body>
                                    <Card.Title>Giving</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                    <Card.Link className="btn btn-success" href="/giving">View</Card.Link>
                                </Card.Body>
                            </Card>

                        </div>
                        <div className="col-3 text-center">
                            <Card className="p-3">
                                <FaRegCalendarAlt size={70} className="w-100" />
                                <Card.Body>
                                    <Card.Title>Calendar</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                    <Card.Link className="btn btn-success" href="/calendar">View</Card.Link>
                                </Card.Body>
                            </Card>

                        </div>
                    </div>
                    <div className="row mt-3">
                        <h2>Collection</h2>
                        <XYPlot height={200} width={1200} stroke="green">
                            <VerticalGridLines />
                            <HorizontalGridLines />
                            <XAxis />
                            <YAxis />
                            <LineSeries data={data} />
                        </XYPlot>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
};

export default Index;