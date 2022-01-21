import React, {useState, useEffect}  from "react";
import Link from "next/link";
import HeartLoader from "../components/loaders/loader";
import Container from '../../node_modules/react-bootstrap/Container';
import Navbar from '../../node_modules/react-bootstrap/Navbar';
import Nav from '../../node_modules/react-bootstrap/Nav';
import NavDropdown from '../../node_modules/react-bootstrap/NavDropdown'

const Wrapper = (props) => {
    const [loadSplash, setLoadSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadSplash(false)
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return  (
        <div className="container-fluid">
            <HeartLoader state={loadSplash}/>
            <header>
                <title>The Giving App</title>
            </header>
            <div className={!loadSplash ? "d-block" : "d-none"}>
                <div className="row header">
                    <Navbar variant="dark" bg="dark" expand="lg">
                        <Container fluid>
                            <Navbar.Brand href="#home">The Giving App</Navbar.Brand>
                            <Navbar.Toggle aria-controls="navbar-dark-example" />
                            <Navbar.Collapse id="navbar-dark-example" className="justify-content-end">
                                <Nav>
                                    <NavDropdown
                                        id="nav-dropdown-dark-example"
                                        title="Account"
                                        menuVariant="dark"
                                    >
                                        <NavDropdown.Item href="/account">Account</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Reports</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/account/login">Login</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
                <div className="row">
                    <div className="col-1 sidebar">
                        <div className="sidebar__menu">
                            <ul>
                                <li>
                                    <Link href="/">
                                        <a>Dashboard</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/calendar">
                                        <a>Calendar</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/members">
                                        <a>Members</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/giving">
                                        <a>Giving</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <Link href="#">
                            <a>Settings</a>
                        </Link>
                    </div>
                    <div className="col-11 content">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Wrapper;