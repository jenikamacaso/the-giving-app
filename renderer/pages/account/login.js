import React, {useState} from "react";
import Router from "next/router";
import AccountWrapper from "../../components/accountWrapper";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Alert from "react-bootstrap/Alert";
import {useForm} from "react-hook-form";

const AccountLogin = () => {
    const {register, handleSubmit, watch, errors, control} = useForm();
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [showAlertDanger, setShowAlertDanger] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const [isTouched, setIsTouched] = useState(false);

    const onSubmit = data => {
        setIsTouched(true)
        if(data.username === "admin" && data.password === "admin") {
            setShowAlertDanger(false)
            setShowAlertSuccess(true)
            setIsInvalid(false)
            setTimeout(() => {
                Router.push('/')
            }, 3000)
        } else {
            setShowAlertSuccess(false)
            setShowAlertDanger(true)
            setIsInvalid(true)
        }
    }

    return  (
        <AccountWrapper>
            <div className="h-100 d-flex align-items-center justify-content-center">
                <Form noValidate onSubmit={handleSubmit(onSubmit)} className="login-wrapper w-25 d-block mx-auto">
                    <h1 className="text-center pb-3">The Giving App</h1>

                    <Alert variant="success" className={showAlertSuccess ? "d-block" : "d-none"}>
                        Login Successful. Redirecting.
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
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Username"
                            className="mb-3"
                        >
                        <Form.Control
                            {...register("username")}
                            type="text"
                            name="username"
                            placeholder="Username"
                            isValid={isTouched && !isInvalid}
                            isInvalid={isTouched && isInvalid} />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control
                                {...register("password")}
                                type="password"
                                name-="password"
                                placeholder="Password"
                                isValid={isTouched && !isInvalid}
                                isInvalid={isTouched && isInvalid} />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check
                            {...register("remember")}
                            type="checkbox"
                            label="Keep me logged in" />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-center" controlId="formBasicActions">
                        <Button type="submit" size="lg" className="px-2 py-1 mx-2" variant="success"
                                onClick={() => setShowAlertSuccess(true)} active>Login</Button>
                    </Form.Group>
                </Form>
            </div>
        </AccountWrapper>
    )
};

export default AccountLogin;