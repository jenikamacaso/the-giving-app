import React, {useState, useEffect}  from "react";
import HeartLoader from "../components/loaders/loader";

const AccountWrapper = (props) => {
    const [loadSplash, setLoadSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadSplash(false)
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return  (
        <div className="container-fluid login">
            <HeartLoader state={loadSplash}/>
            <header>
                <title>The Giving App - Account</title>
            </header>
            <div className={!loadSplash ? "d-block" : "d-none"}>
                <div className="row">
                    <div className="col-12 content">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AccountWrapper;