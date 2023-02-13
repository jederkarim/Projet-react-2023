import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';


const ListTag = () => {
    const [tags, setTags] = useState([]);
    const handleTagList = async () => {
        try {
            const tagList = await axios.get('http://localhost:4000/api/tags')
            setTags(tagList.data)
        } catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        handleTagList();
    }, []);

    const refreshList = () => {
        handleTagList();
    };

    const deleteOneTag = async (e, id) => {
        try {
            await axios.delete(`http://localhost:4000/api/tags/${id}`)
            handleTagList();
            refreshList();
        }
        catch (error) {
            console.log(error)
        }
    };



    return (
        <div className="row">
            <div className="col-md-12">
                <h4>Tag list</h4>
                <div>
                    <div className="d-grid gap-2">
                        <Link to="/admin/addtags">
                            <button className="btn btn-success" type="button">
                                <i className='fa fa-plus'></i> Add new tag</button>
                        </Link>
                    </div>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tag Name</th>
                                <th scope="col">Tag Description:</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        {tags &&
                            tags.map((tag, index) => (
                                <tbody key={tag._id}>
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{tag.name}</td>
                                        <td>{tag.description}</td>
                                       
                                        <td>
                                            <button className='btn btn-danger me-1' onClick={(e) => { deleteOneTag(e, tag._id) }}>
                                                <i className='fa fa-trash'></i> Delete</button>
                                            <Link to={`/admin/UpdateTag/${tag._id}`} className='btn btn-success'><i className='fa fa-edit'></i> Update</Link>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                            )}
                    </table>
                </div>

            </div>

        </div>
    )
}
export default ListTag

