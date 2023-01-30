import React, {useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom'
// import AsyncSelect from 'react-select';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddEvent() {
    var Navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        eventName: Yup.string()
            .required("Event name is required."),
        eventDescription: Yup.string()
            .required("Event discription is required."),
        startDate: Yup.string()
            .required("Start date is required."),
        endDate: Yup.string()
            .required("End date is required."),
        startTime: Yup.string()
            .required("Start time is required."),
        endTime: Yup.string()
            .required("End time is required."),
        price: Yup.string()
            .required("Price is required."),
        location: Yup.string()
            .required("Location is required."),
    });


    const [setSelectedFile] = useState(null)
    const handelPicChange = (e) => {
        if (e.target.files.length > 0) {
            const selectedFile = e.target.files[0]
            setSelectedFile(selectedFile)
        }
    }
    
    const initialValues = {
        eventName: "",
        eventDescription: "",
        startDate: "",
        // endDate: "",
        startTime: "",
        endTime: "",
        price: "",
        location: "",
    };

    const handleSubmit = async (values) => {
        try {
            await axios.post('http://localhost:4000/api/Events', values)
            Navigate("/events");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 pt-3">
                    <h1 className="text-center">Add new event</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        <Form>
                            <div className="form-group mb-3">
                                <label htmlFor="eventName">Event name:</label>


                                <Field
                                    type="text"
                                    id="eventName"
                                    name="eventName"
                                    className="form-control"
                                    placeholder="Enter your event name here"
                                />
                                <ErrorMessage
                                    name="eventName"
                                    component="small"
                                    className="text-danger"
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="eventDescription">Event discription:</label>
                                <Field
                                    type="text"
                                    id="eventDescription"
                                    name="eventDescription"
                                    className="form-control"
                                    placeholder="Enter your event description here"
                                />
                                <ErrorMessage
                                    name="eventDescription"
                                    component="small"
                                    className="text-danger"
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="startDate">Start date:</label>


                                <Field
                                    type="text"
                                    id="startDate"
                                    name="startDate"
                                    className="form-control"
                                    placeholder="Enter your event start date here"
                                />
                                <ErrorMessage
                                    name="startDate"
                                    component="small"
                                    className="text-danger"
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="endDate">End date:</label>
                                {/* <DatePicker
                                    mode="date"
                                    className="form-control"
                                    format="YYYY-MM-DD"
                                    minDate={Date.now.toString()}
                                    maxDate="2050-06-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    name="endDate"
                                    placeholder="Enter your event end date here"
                                    showIcon={false}
                                    customStyles={{
                                        dateInput: {
                                            marginLeft: 0,
                                            borderColor: "#fff"
                                        }
                                    }}
                                /> */}
                                <ErrorMessage
                                    name="endDate"
                                    component="small"
                                    className="text-danger"
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="startTime">Start time:</label>
                                <Field
                                    type="text"
                                    id="startTime"
                                    name="startTime"
                                    className="form-control"
                                    placeholder="Enter your event start time here"
                                />
                                <ErrorMessage
                                    name="startTime"
                                    component="small"
                                    className="text-danger"
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="endTime">End time:</label>
                                <Field
                                    type="text"
                                    id="endTime"
                                    name="endTime"
                                    className="form-control"
                                    placeholder="Enter your event end time here"
                                />
                                <ErrorMessage
                                    name="endTime"
                                    component="small"
                                    className="text-danger"
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="price">Price:</label>
                                <Field
                                    type="text"
                                    id="price"
                                    name="price"
                                    className="form-control"
                                    placeholder="Enter your ticket price here"
                                />
                                <ErrorMessage
                                    name="price"
                                    component="small"
                                    className="text-danger"
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="location">Location:</label>
                                <Field
                                    type="text"
                                    id="location"
                                    name="location"
                                    className="form-control"
                                    placeholder="Enter your event location here"
                                />
                                <ErrorMessage
                                    name="location"
                                    component="small"
                                    className="text-danger"
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="picture">Picture:</label>
                                <input type={"file"}
                                    id="picture"
                                    name="picture"
                                    className="form-control"
                                    onChange={(e) => handelPicChange(e)} />
                                <ErrorMessage
                                    name="location"
                                    component="small"
                                    className="text-danger"
                                />
                            </div>

                            {/* <AsyncSelect
                                isMulti
                                name="Tags"
                                options={tags}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={(selectedOption) => { handleChange(selectedOption) }}
                            /> */}

                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary">
                                    <i className='fa fa-save'></i> Add new event
                                </button>
                                <Link className="btn btn-link" to="/events">
                                    Back
                                </Link>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div >
    );
};

export default AddEvent;
