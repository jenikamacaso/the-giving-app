import React, {useEffect, useState} from "react";
import Link from "next/link";
import Wrapper from "../components/wrapper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useForm, Controller} from 'react-hook-form';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


const Giving = () => {
    const {register, handleSubmit, watch, errors, control} = useForm();
    const [startDate, setStartDate] = useState(new Date());
    const [showAddEntry, setShowAddEntry] = useState(false);
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [showAlertDanger, setShowAlertDanger] = useState(false);

    const onSubmit = data => console.log(data);

    useEffect(() => {
        setTimeout(() => {
            setShowAlertSuccess(false)
        }, 2000);
    }, [showAlertSuccess]);

    return (
        <Wrapper>
            <h1>Giving</h1>

            <Alert variant="success" className={showAlertSuccess ? "d-block" : "d-none"}>
                Entry added successfully
            </Alert>
            <Alert variant="danger" className={showAlertDanger ? "d-block" : "d-none"} onClose={() => setShowAlertDanger(false)} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    Change this and that and try again. Duis mollis, est non commodo
                    luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                    Cras mattis consectetur purus sit amet fermentum.
                </p>
            </Alert>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Tithe</th>
                        <th>Best Gift</th>
                        <th>Building Fund</th>
                        <th>Seed Faith</th>
                        <th>Love gift/s</th>
                        <th>Flowers</th>
                        <th>Youth</th>
                        <th>Dance</th>
                        <th>Music</th>
                        <th>Meralco</th>
                        <th>Others</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>01/18/2022</td>
                        <td>John Doe</td>
                        <td>100</td>
                        <td>100</td>
                        <td>100</td>
                        <td>100</td>
                        <td>100</td>
                        <td>100</td>
                        <td>100</td>
                        <td>100</td>
                        <td>100</td>
                        <td>100</td>
                        <td>100</td>
                        <td>1000</td>
                        <td>
                            <Button className="px-2 py-1" variant="secondary" disabled={true}>Add</Button>
                        </td>
                        </tr>
                        <tr>
                            <td>01/18/2022</td>
                            <td>Juan Doe</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td className="read-only">1000</td>
                            <td>
                                <Button className="px-2 py-1" variant="primary"
                                        onClick={() => setShowAddEntry(true)} active>Add</Button>
                            </td>
                        </tr>
                        <tr className={showAddEntry ? "d-table-row" : "d-none"}>
                            <td>
                                <Controller
                                    render={({field}) => (
                                        <DatePicker
                                            id="calendar"
                                            className="w-100"
                                            selected={startDate}
                                            maxDate={new Date()}
                                            onChange={(date) => setStartDate(date)}
                                            dateFormat='dd/MM/yyyy'
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            placeholderText="Giving Date"
                                            withPortal
                                        />
                                    )}
                                    rules={{required: false}}
                                    name="calendar"
                                    control={control}
                                    valueName="selected"
                                />
                            </td>
                            <td>
                                <select className="w-100" {...register("gender")}>
                                    <option value="">Select Member</option>
                                    <option value="john-doe">John Doe</option>
                                    <option value="juan-doe">Juan Doe</option>
                                </select>
                            </td>
                            <td>
                                <input className="w-100"/>
                            </td>
                            <td>
                                <input className="w-100"/>
                            </td>
                            <td>
                                <input className="w-100"/>
                            </td>
                            <td>
                                <input className="w-100"/>
                            </td>
                            <td>
                                <input className="w-100"/>
                            </td>
                            <td>
                                <input className="w-100"/>
                            </td>
                            <td>
                                <input className="w-100"/>
                            </td>
                            <td>
                                <input className="w-100"/>
                            </td>
                            <td>
                                <input className="w-100"/>
                            </td>
                            <td>
                                <input className="w-100"/>
                            </td>
                            <td>
                                <input className="w-100"/>
                            </td>
                            <td>
                                <input disabled={true} readOnly={true} value="1000" className="w-100"/>
                            </td>
                            <td>
                                <Button className="px-2 py-1" variant="primary"
                                        onClick={() => setShowAlertSuccess(true)} active>Save</Button>
                                <Button className="px-2 py-1" variant="danger"
                                        onClick={() => setShowAlertDanger(true)} active>Cancel</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </form>
        </Wrapper>
    )
};

export default Giving;