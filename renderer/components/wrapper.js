import React, { useState, useEffect } from "react";
import Link from "next/link";
import HeartLoader from "../components/loaders/loader";
import Container from '../../node_modules/react-bootstrap/Container';
import Navbar from '../../node_modules/react-bootstrap/Navbar';
import Nav from '../../node_modules/react-bootstrap/Nav';
import NavDropdown from '../../node_modules/react-bootstrap/NavDropdown';
import { BsFillPeopleFill, BsFillHeartFill, BsFillHouseDoorFill } from "react-icons/bs";
import { SiMicrosoftexcel } from "react-icons/si";
import { FaCogs } from "react-icons/fa";
import Head from "next/head";
import Router from "next/router";

const Wrapper = (props) => {
    const [loadSplash, setLoadSplash] = useState(true);
    let isLoggedIn = false;


    const login = () => {
        if (typeof window !== "undefined") {
            isLoggedIn = window.api.isLoggedIn();
        }
    }

    const logout = () => {
        console.log('calling logout')
        if (typeof window !== "undefined") {
            window.api.logout();
        }
    }

    useEffect(() => {
        login();
        setLoadSplash(false)

        if (!isLoggedIn) {
            Router.push('/account/login')
        }
    }, []);

    return (
        <>
            <Head>
                <title>{props.title} - The Giving App</title>
            </Head>
            <HeartLoader state={loadSplash} />
            <div className="container-fluid">
                <header>
                    <title>The Giving App</title>
                </header>
                <div className={!loadSplash ? "d-block" : "d-none"}>
                    <div className="row header">
                        <Navbar variant="dark" bg="dark" expand="lg">
                            <Container fluid>
                                <Navbar.Brand href="/">The Giving App</Navbar.Brand>
                                <Navbar.Toggle aria-controls="navbar-dark-example" />
                                <Navbar.Collapse id="navbar-dark-example" className="justify-content-end">
                                    <Nav>
                                        <NavDropdown
                                            id="nav-dropdown-dark-example"
                                            title="Account"
                                            menuVariant="dark"
                                        >
                                            <NavDropdown.Item href="/account">Account</NavDropdown.Item>
                                            <NavDropdown.Item href="/reports">Reports</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/account/login">Login</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.4" onClick={() => logout()}>Logout</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </div>
                    <div className="row">
                        <div className="col-2 sidebar">
                            <div className="sidebar__menu d-flex flex-column justify-content-between h-100">
                                <ul>
                                    <li>
                                        <Link href="/">
                                            <a><BsFillHouseDoorFill />&nbsp;Dashboard</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/calendar">
                                            <a><SiMicrosoftexcel />&nbsp;Calendar</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/members">
                                            <a><BsFillPeopleFill />&nbsp;Members</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/giving">
                                            <a><BsFillHeartFill />&nbsp;Giving</a>
                                        </Link>
                                    </li>
                                </ul>
                                <ul className="mb-0">
                                    <li className="border-0">
                                        <Link href="/settings">
                                            <a><FaCogs />&nbsp;Settings</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-10 content">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Wrapper;