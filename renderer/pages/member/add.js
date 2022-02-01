import React, { useState } from "react";
import Wrapper from "../../components/wrapper";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MemberAdd = () => {
    const { register, handleSubmit, watch, errors, control } = useForm();
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [showAlertDanger, setShowAlertDanger] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const onSubmit = async (data) => {
        // Calls api
        const result = await window.api.createMember({
            Name: data.name,
            Email: 'test@gmail.com',
            Address: 'Test Address',
            Phone: '0394534534',
            DateOfBirth: 'June 30, 1991',
            IsActive: true,
            IsDeleted: false,
        });

        console.log(result)
    }
    return (
        <Wrapper title="Add Member">
            <div className="row">
                <div className="col-12">
                    <h1>Add Member</h1>
                    <Form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-5 w-25 d-block">

                        <Alert variant="success" className={showAlertSuccess ? "d-block" : "d-none"}>
                            New member added
                        </Alert>
                        <Alert variant="danger" className={showAlertDanger ? "d-block" : "d-none"}>
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p>
                                Change this and that and try again. Duis mollis, est non commodo
                                luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                                Cras mattis consectetur purus sit amet fermentum.
                            </p>
                        </Alert>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                {...register("name")}
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                isValid={isTouched && !isInvalid}
                                isInvalid={isTouched && isInvalid} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control
                                {...register("gender")}
                                type="text"
                                name="gender"
                                placeholder="Gender"
                                isValid={isTouched && !isInvalid}
                                isInvalid={isTouched && isInvalid} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicAge">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                {...register("age")}
                                type="text"
                                name="age"
                                placeholder="Age"
                                isValid={isTouched && !isInvalid}
                                isInvalid={isTouched && isInvalid} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicBirthday">
                            <Form.Label>Birthday</Form.Label>
                            <Controller
                                render={({ field }) => (
                                    <DatePicker
                                        id="calendar"
                                        className="form-control w-100"
                                        selected={startDate}
                                        maxDate={new Date()}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat='dd/MM/yyyy'
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        placeholderText="Birthday"
                                    />
                                )}
                                defaultValue=""
                                rules={{ required: false }}
                                name="birthday"
                                control={control}
                                valueName="selected"
                            />
                        </Form.Group>

                        <Form.Group className="d-flex justify-content-start" controlId="formBasicActions">
                            <Button type="submit" size="lg" className="px-2 py-1" variant="success"
                                onClick={() => setShowAlertSuccess(true)} active>Save</Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </Wrapper>
    )
};

export default MemberAdd;