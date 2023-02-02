import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axios from 'axios';


function UpdateCompany() {

    const { id } = useParams();
    let navigate = useNavigate();
    const initialValues = {
        companyName: "",
        companyDescription: "",
        email: "",
        password: "",
        role: "",
    };
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
        role: Yup.string().required('Add a role.')
    });

    const [company, setCompany] = useState(initialValues);

    const getCompany = id => {
        axios.getOne(id)
            .then(response => {
                const fields = ['companyName', 'companyDescription', 'email', 'role'];
                fields.forEach(field => initialValues[field] = response.data[field]);

                setCompany(response.data);

            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (id)
            getCompany(id);
    }, [id]);

    const handleSubmit = (values) => {

        const data = {
            companyName: values.companyName,
            companyDescription: values.companyDescription,
            email: values.email,
            role: values.role,

        };

        axios.updateOne(id, data).then(response => {
            // toast.success(response.data.message);
            navigate("/ListCompany");



        }).catch(error => {
            console.log(error);
            // toast.error(error.response.data.message);

        })

    };
    // const handleUpdateCompany = async (event, id) => {
    //     try {
    //         event.preventDefault()
    //         await axios.put('http://localhost:4000/api/company' + params.idCompany, company)
    //         navigate("/ListCompany");
    //     } catch (error) {
    //         console.log(error);

    //     }
    // };
    // const handleChange = (e) => {
    //     const id = e.target.id
    //     const value = e.target.value
    //     setCompany({ ...company, [id]: value })
    // }

    // useEffect(() => {
    //     const getCompany = async () => {
    //         const CompanyfromServer = await axios.get('http://localhost:4000/api/company' + params.idCompany)
    //         setCompany(CompanyfromServer.data);
    //     };
    //     getCompany();
    // }, [params]);




    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 pt-3">
                    <h1 className="text-center">Update Company</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleSubmit(values)}
                    >

                        <Form>
                            <div className="form-group mb-3">
                                <label htmlFor="companyName">company Name:</label>
                                <Field

                                    type="text"
                                    id="companyName"
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
