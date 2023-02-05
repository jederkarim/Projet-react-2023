import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axios from 'axios';


function UpdateCompany() {
    const navigate = useNavigate()
    const params = useParams()
    const [company, setCompany] = useState({
        
            companyName: "",
            companyDescription: "",
            email: "",
            password: "",
            role: "",
        
    });

    const validationSchema = Yup.object().shape({
        companyName: Yup.string()
            .min(5, "Too short.")
            .max(50, "Too long.")
            .required("companyName is required."),
        companyDescription: Yup.string()
            .min(2, "Too short.")
            .max(10, "Too long.")
            .required("companyDescriptio is required."),
        email: Yup.string()
            .email("Invalid email.")
            .required("Email is required."),
        password: Yup.string()
            .required("Password is required.")
            .min(8, "Too short.")
            .max(50, "Too long."),
        role: Yup.string().required('Add a role.')
    });

    const handleUpdateCompany = async (event, id) => {
        event.preventDefault()
        await axios.put('http://localhost:4000/api/company' + params.idCompany, company)
        navigate('/admin/listCompany')
    }
    const handleChange = (e) => {
        const id = e.target.id
        const value = e.target.value
        setCompany({ ...company, [id]: value })
    }
    useEffect(() => {
        const getCompany = async () => {
            const companyfromServer = await axios.get('http://localhost:4000/api/company' + params.idCompany)
            setCompany(companyfromServer.data);
        };
        getCompany();
    }, [params]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 pt-3">
                    <h1 className="text-center">Update Company</h1>
                    <Formik
                         initialValues={{companyName: "",companyDescription: "", email: "", password: "", role: ""}}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleUpdateCompany(values)}
                    >

                        <Form>
                            <div className="form-group mb-3">
                                <label htmlFor="companyName">company Name:</label>
                                <Field
                                    type="text"
                                    id="companyName"
                                    value={company.companyName} onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter your company Name here"
                                />
                                <ErrorMessage
                                    name="companyName"
                                    component="small"
                                    className="text-danger"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="companyDescription">Company Description:</label>
                                <Field

                                    type="text"
                                    id="companyDescription"
                                    value={company.companyDescription} onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter Description of company here"

                                />
                                <ErrorMessage
                                    name="companyDescription"
                                    component="small"
                                    className="text-danger"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="email">Email:</label>
                                <Field

                                    type="email"
                                    id="email"
                                    name="email"
                                    value={company.email} onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter your email here"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="small"
                                    className="text-danger"
                                />
                            </div>

                            <div id="my-radio-group" className="d-grid gap-2">Role:</div>
                            <div role="group" className="d-grid gap-2 " >
                                <label>
                                    <Field
                                        type="radio"
                                        id="role"
                                        name="role"
                                    />
                                    User
                                </label>
                                <label  >
                                    <Field type="radio"
                                        id="role"
                                        name="role"
                                    />
                                    Admin
                                </label>
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" /*value="update"*/ className="btn btn-primary" to="/admin/UpdateCompany">
                                    <i className='fa fa-save'></i> Update
                                </button>
                                <Link className="btn btn-link" to="/companys">
                                    Back
                                </Link>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};
export default UpdateCompany;
