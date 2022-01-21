import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Alert from "react-bootstrap/Alert";
import {useForm} from "react-hook-form";
import Wrapper from "../../components/wrapper";

const Account = () => {
    const {register, handleSubmit, watch, errors, control} = useForm();
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [showAlertDanger, setShowAlertDanger] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const [isTouched, setIsTouched] = useState(false);

    const onSubmit = data => console.log(data)

    return  (
        <Wrapper title="My Account">
            <div className="row">
                <div className="col-12">
                    <h1>My Account</h1>
                    <Form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-5 w-25 d-block">

                        <Alert variant="success" className={showAlertSuccess ? "d-block" : "d-none"}>
                            Account details updated
                        </Alert>
                        <Alert variant="danger" className={showAlertDanger ? "d-block" : "d-none"}>
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p>
                                Change this and that and try again. Duis mollis, est non commodo
                                luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                                Cras mattis consectetur purus sit amet fermentum.
                            </p>
                        </Alert>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                {...register("email")}
                                type="text"
                                name="email"
                                placeholder="Email"
                                value="admin@jblcchurch.page"
                                isValid={isTouched && !isInvalid}
                                isInvalid={isTouched && isInvalid} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                {...register("username")}
                                type="text"
                                name="username"
                                placeholder="Username"
                                value="admin"
                                isValid={isTouched && !isInvalid}
                                isInvalid={isTouched && isInvalid} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                {...register("password")}
                                type="password"
                                name-="password"
                                placeholder="Password"
                                value=""
                                isValid={isTouched && !isInvalid}
                                isInvalid={isTouched && isInvalid} />
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

export default Account;