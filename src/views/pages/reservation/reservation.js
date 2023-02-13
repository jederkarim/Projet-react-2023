import React from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams } from 'react-router-dom';

export default function Reservation() {
    const { id } = useParams();
    
    const validationSchema = Yup.object().shape({
        clientFirstName: Yup.string()

            .required("First name is required."),
        clientLastName: Yup.string()

            .required("Last name is required."),

        clientEmail: Yup.string()
            .required("Email is required."),
    });
    const initialValues = {
        clientFirstName: "",
        clientLastName: "",
        clientEmail: "",
    };
    const handleSubmit = async (values) => {
        values.eventId = id;
        try {
            await axios.post('http://localhost:4000/api/reservation', values)
          } catch (error) {
            console.log(error);
          }
    }
    return (

        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 pt-3">
                    <h1 className="text-center">Reservation</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleSubmit(values)}
                    >

                        <Form>
                            <div className="form-group mb-3">
                                <label htmlFor="clientFirstName">First name:</label>
                                <Field
                                    type="text"
                                    name="clientFirstName"
                                    className="form-control"
                                    placeholder="Enter your first name here"

                                />
                                <ErrorMessage
                                    name="clientFirstName"
                                    component="small"
                                    className="text-danger"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="clientLastName">Last name:</label>
                                <Field
                                    type="text"
                                    id="clientLastName"
                                    name="clientLastName"
                                    className="form-control"
                                    placeholder="Enter your last name here"

                                />
                                <ErrorMessage
                                    name="clientLastName"
                                    component="small"
                                    className="text-danger"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="clientEmail">Email:</label>
                                <Field
                                    type="text"
                                    id="clientEmail"
                                    name="clientEmail"
                                    className="form-control"
                                    placeholder="Enter your last name here"

                                />
                                <ErrorMessage
                                    name="clientEmail"
                                    component="small"
                                    className="text-danger"
                                />
                            </div>
                            <div className='d-grid gap-2'>
                        <button className='btn btn-primary' type='submit'>Reserve</button>
                    </div>
                        </Form>
                    </Formik>
                   
                </div>
            </div>
        </div>
    )
}
