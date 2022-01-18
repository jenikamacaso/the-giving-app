import React from "react";
import Wrapper from "../components/wrapper";
import Badge from 'react-bootstrap/Badge';

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
                            <Badge pill bg="success">
                                Member
                            </Badge>
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
                            <Badge pill bg="dark">
                                Visitor
                            </Badge>
                        </div>
                        <div className="col">
                            +
                        </div>
                    </div>
                    <div className="row members-list__entries">
                        <div className="col">
                            Jay Doe
                        </div>
                        <div className="col">
                            10
                        </div>
                        <div className="col">
                            <Badge pill bg="secondary">
                                Inactive
                            </Badge>
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