import React, {useState, useEffect}  from "react";
import Link from "next/link";
import HeartLoader from "../components/loaders/loader";
import {Head} from "next/document";

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
                    <div className="col-1 header__logo">The Giving App</div>
                    <div className="col-11 d-flex justify-content-end header__menu">
                        <div>
                            <Link href="#">
                                <a className="px-3">Logged in as Admin</a>
                            </Link>
                            <Link href="#">
                                <a className="px-3">Logout</a>
                            </Link>
                        </div>
                    </div>
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