import React from "react";
import Wrapper from "../components/wrapper";

const Members = () => {
    return (
        <Wrapper>
            <h1>Members</h1>
            <div className="row members-list">
                <div className="col-12">
                    <div className="row members-list__header">
                        <div className="col">
                            Name
                        </div>
                        <div className="col">
                            Gender
                        </div>
                        <div className="col">
                            Status
                        </div>
                        <div className="col">
                            Actions
                        </div>
                    </div>
                    <div className="row members-list__entries">
                        <div className="col">
                            John Doe
                        </div>
                        <div className="col">
                            30
                        </div>
                        <div className="col">
                            Member
                        </div>
                        <div className="col">
                            +
                        </div>
                    </div>
                    <div className="row members-list__entries">
                        <div className="col">
                            Juan Doe
                        </div>
                        <div className="col">
                            20
                        </div>
                        <div className="col">
                            Visitor
                        </div>
                        <div className="col">
                            +
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
};

export default Members;