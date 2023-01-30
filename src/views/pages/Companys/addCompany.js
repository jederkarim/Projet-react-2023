import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddCompany = () => {
  var Navigate = useNavigate();
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

  const initialValues = {
    companyName: "",
    companyDescription:"",
    email: "",
    password: "",
    role: "user",
  };
  const handleSubmit = async (values) => {
    try {
      await axios.post('http://localhost:4000/api/company',values)
console.log(values)
      Navigate("/admin/listCompanys");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 pt-3">
          <h1 className="text-center">Add new company</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ resetForm }) => (
              <Form>
                       <div className="form-group mb-3">
                  <label htmlFor="companyName">CompanyName:</label>
                  <Field
                    type="text"
                    name="companyName"
                    className="form-control"
                    placeholder="Enter your Name of company here"
                  />
                  <ErrorMessage
                    name="companyName"
                    component="small"
                    className="text-danger"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="companyDescription">CompanyDescription:</label>
                  <Field
                    type="text"
                    name="companyDescription"
                    className="form-control"
                    placeholder="Enter your Description of company here"
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
                    name="email"
                    className="form-control"
                    placeholder="Enter your email address here"
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
                    name="password"
                    className="form-control"
                    placeholder="Enter your password here"
                  />
                  <ErrorMessage
                    name="password"
                    component="small"
                    className="text-danger"
                  />
                </div>

                <div id="my-radio-group">Role</div>
                <div role="group" >
                  <label> <Field type="radio"  name="role" value="user" />  User</label>
                  <label> <Field type="radio"  name="role" value="admin" />  Admin </label>
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    <i className='fa fa-save'></i> Save
                  </button>
                  <Link className="btn btn-link" to="/companys">
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

export default AddCompany

