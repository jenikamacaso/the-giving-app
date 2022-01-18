import React, {useState, useEffect}  from "react";
import Link from "next/link";
import HeartLoader from "../components/loaders/loader";

const Index = () => {
    const [loadSplash, setLoadSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadSplash(false)
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return  (
        <div className="container-fluid">
            <HeartLoader state={loadSplash}/>
            <div className={!loadSplash ? "d-block" : "d-none"}>
                <header>
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
                </header>
                <div className="row">
                    <div className="col-1 sidebar">
                        <div className="sidebar__menu">
                            Sidebar
                        </div>
                        <Link href="#">
                            <a>Settings</a>
                        </Link>
                    </div>
                    <div className="col-11 content"><p>DASHBOARD</p></div>
                </div>
            </div>
        </div>
    )
};

export default Index;