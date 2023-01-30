
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import axios from 'axios';


function UpdateCompany() {

    const params = useParams()
    let navigate = useNavigate();
    const [company, setCompany] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(5, "Too short.")
            .max(50, "Too long.")
            .required("First name is required."),
        lastName: Yup.string()
            .min(2, "Too short.")
            .max(10, "Too long.")
            .required("Last name is required."),
        email: Yup.string()
            .email("Invalid email.")
            .required("Email is required."),
        password: Yup.string()

    });

    const handleUpdateCompany = async (event, id) => {
        try {
            event.preventDefault()
            await axios.put('http://localhost:4000/api/company' + params.idCompany,company)
            navigate("/ListCompany");
        } catch (error) {
            console.log(error);

        }
    };
        const handleChange = (e) => {
        const id = e.target.id
        const value = e.target.value
        setCompany({ ...company, [id]: value })
    }

    useEffect(() => {
        const getCompany = async () => {
            const CompanyfromServer = await axios.get('http://localhost:4000/api/company' + params.idCompany)
            setCompany(CompanyfromServer.data);
        };
        getCompany();
    }, [params]);




    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 pt-3">
                    <h1 className="text-center">Update Company</h1>
                    <Formik
                        validationSchema={validationSchema}
                        onSubmit={(event) => handleUpdateCompany(event)}
                    >

                        <Form>
                            <div className="form-group mb-3">
                                <label htmlFor="companyName">company Name:</label>
                                <Field

                                    type="text"
                                    name="companyName"
                                    value={company.companyName}
                                    onChange={handleChange}
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
                                    name="companyDescription"
                                    value={company.companyDescription}
                                    onChange={handleChange}
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
                                    value={company.email}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter your email here"

                                />
                                <ErrorMessage
                                    name="email"
                                    component="small"
                                    className="text-danger"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="password">Password:</label>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={company.password}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter your password here"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="small"
                                    className="text-danger"
                                />
                            </div>
                            <div id="my-radio-group"  className="d-grid gap-2">Role:</div>
                            <div role="group" className="d-grid gap-2 " >
                                <label>
                                    <Field
                                        type="radio"
                                        id="role"
                                        name="role"
                                        value={company.user}
                                        onChange={handleChange} />
                                    User
                                </label>
                                <label  >
                                    <Field type="radio"
                                        id="role"
                                        name="role"
                                        value={company.admin}
                                        onChange={handleChange} />                                       
                                    Admin
                                </label>
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" value="update" className="btn btn-primary">
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
