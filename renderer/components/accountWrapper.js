import React, {useState, useEffect} from "react";
import HeartLoader from "../components/loaders/loader";
import Head from "next/head";

const AccountWrapper = (props) => {
    const [loadSplash, setLoadSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadSplash(false)
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Head>
                <title>{props.title} - The Giving App</title>
            </Head>
            <HeartLoader state={loadSplash}/>
            <div className="container-fluid login">
                <div className={!loadSplash ? "d-block" : "d-none"}>
                    <div className="row">
                        <div className="col-12 content">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default AccountWrapper;