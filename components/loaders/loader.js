import React  from "react";

const HeartLoader = (props) => {
     return (
     <div className={props.state ? "heart-loader-wrapper" : "d-none"}>
         <div className="heart-loader" />
     </div>
    )
};

export default HeartLoader;