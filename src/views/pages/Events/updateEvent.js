import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axios from 'axios';

function UpdateEvent() {
    const params = useParams()
    let navigate = useNavigate();
    const [event, setEvent] = useState({
        eventName: "",
        eventDescription: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        price: "",
        location: "",
    });
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

    const handleUpdateEvent = async (event, id) => {
        try { 
            event.preventDefault()
            await axios.put('http://localhost:4000/api/events/' + params.id, event)
            navigate("/admin/listEvent");
        } catch (error) {
            console.log(error);

        }
    };
    const handleChange = (e) => {
        const id = e.target.id
        const value = e.target.value
        setEvent({ ...event, [id]: value })
    }

    useEffect(() => {
        const getEvent = async () => {
            const EventfromServer = await axios.get('http://localhost:4000/api/events/' + params.id)
            setEvent(EventfromServer.data);
        };
        getEvent();
    }, [params]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 pt-3">
                    <h1 className="text-center">Add new event</h1>
                    <Formik
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleUpdateEvent(values)}
                    >
                        <Form>
                            <div className="form-group mb-3">
                                <label htmlFor="eventName">Event name:</label>

                                <Field
                                    type="text"
                                    id="eventName"
                                    name="eventName"
                                    value={event.eventName}
                                    onChange={handleChange}
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
                                    name="eventDescription"
                                    value={event.eventDescription}
                                    onChange={handleChange}
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
                                    type="date"
                                    name="startDate"
                                    value={event.startDate}
                                    onChange={handleChange}
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
                                <Field
                                    type="date"
                                    name="endDate"
                                    value={event.endDate}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter your event end date here"
                                />

                                <ErrorMessage
                                    name="endDate"
                                    component="small"
                                    className="text-danger"
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="startTime">Start time:</label>
                                <Field
                                    type="time"
                                    name="startTime"
                                    value={event.startTime}
                                    onChange={handleChange}
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
                                    type="time"
                                    name="endTime"
                                    value={event.endTime}
                                    onChange={handleChange}
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
                                    type="currency"
                                    currency="TND"
                                    name="price"
                                    value={event.price}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter your price here"
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
                                    name="location"
                                    value={event.location}
                                    onChange={handleChange}
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
                                    value={event.picture}
                                    className="form-control"
                                    // onChange={(e) => handelPicChange(e)} />
                                    />
                                <ErrorMessage
                                    name="location"
                                    component="small"
                                    className="text-danger"
                                />
                            </div>

                            <div className="d-grid gap-2">
                            <button type="submit" value="update" className="btn btn-primary" to="/admin/UpdateEvent">
                                    <i className='fa fa-save'></i> Update
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

export default UpdateEvent;
