import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axios from 'axios';


function UpdateTag() {

    const params = useParams()
    let navigate = useNavigate();
    const [tag, setTag] = useState({
        name: "",
        description: "",
    });
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

    const handleUpdateTag = async (event, id) => {
        try {
            event.preventDefault()
            await axios.put('http://localhost:4000/api/tags' + params.idTag, tag)
            navigate("/listtag");
        } catch (error) {
            console.log(error);

        }
    };
    const handleChange = (e) => {
        const id = e.target.id
        const value = e.target.value
        setTag({ ...tag, [id]: value })
    }

    useEffect(() => {
        const getTag = async () => {
            const TagfromServer = await axios.get('http://localhost:4000/api/tags' + params.idTag)
            setTag(TagfromServer.data);
        };
        getTag();
    }, [params]);




    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 pt-3">
                    <h1 className="text-center">Add new Tag</h1>
                    <Formik
                        validationSchema={validationSchema}
                        onSubmit={handleUpdateTag}
                    >
                        {({ resetForm }) => (
                            <Form>
                                <div className="form-group mb-3">
                                    <label htmlFor="name">Tag name:</label>
                                    <Field
                                        type="text"
                                        id="name"
                                        value={tag.name}
                                        onChange={handleChange}
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
                                        value={tag.description}
                                        onChange={handleChange}
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
export default UpdateTag;
