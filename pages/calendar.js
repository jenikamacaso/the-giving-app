import React from "react";
import Wrapper from "../components/wrapper";
import Calendar from 'react-calendar';


const PageCalendar = () => {
    return  (
        <Wrapper>
            <h1>Calendar</h1>
            <div className="row calendar-list">
                <div className="col-12">
                    <Calendar />
                </div>
            </div>
        </Wrapper>
    )
};

export default PageCalendar;