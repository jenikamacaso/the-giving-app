import React  from "react";

const HeartLoader = (props) => {
     return (
     <div className={props.state ? "px-0 heart-loader-wrapper" : "d-none"}>
         <div className="heart-loader" />
     </div>
    )
};

export default HeartLoader;