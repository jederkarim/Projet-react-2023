import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddTags = () => {
    var Navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(5, "Too short.")
            .max(50, "Too long.")
            .required("Tag name is required."),
        description: Yup.string()
            .min(2, "Too short.")
            .max(10000, "Too long.")
            .required("Description is required. "),
    });

    const initialValues = {
        name: "",
        description: "",
    };
    const handleSubmit = async (values) => {

        try {
            await axios.post('http://localhost:4000/api/Tags', values)
            Navigate("/addTags");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 pt-3">
                    <h1 className="text-center">Add new Tag</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        {({ resetForm }) => (
                            <Form>
                                <div className="form-group mb-3">
                                    <label htmlFor="name">Tag name:</label>
                                    <Field
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        placeholder="Enter your tag name here"

                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="description">Tag description:</label>
                                    <Field

                                        id="description"
                                        name="description"
                                        className="form-control"
                                        placeholder="Enter your tag description here"

                                    />
                                    <ErrorMessage
                                        name="description"
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>


                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">
                                        <i className='fa fa-save'></i> Add new tag
                                    </button>
                                    <Link className="btn btn-link" to="/tags">
                                        Back
                                    </Link>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default AddTags

