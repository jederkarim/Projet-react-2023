import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import axios from 'axios';


const ListCompany = () => {
  const [companys, setCompanys] = useState([]);
  const handleCompanyList = async () => {
    try {
      const compnaylist = await axios.get('http://localhost:4000/api/company')
      setCompanys(compnaylist.data)
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    handleCompanyList();
  }, []);

  const refreshList = () => {
    handleCompanyList();
  };

   const deleteOneComapany = async (e, id) => {
    try {
      await axios.delete(`http://localhost:4000/api/company/${id}`)
      handleCompanyList();
      refreshList();
    }
    catch (error) {
        console.log(error)
    }
  };
  

  return (
    <div className="row">

      <div className="col-md-12">
        <h4>Companys list</h4>
        <div>
          <div className="d-grid gap-2">
            <Link to="/admin/addcompany">
              <button className="btn btn-success" type="button">
                <i className='fa fa-plus'></i> Add new company</button>
            </Link>
          </div>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">company Name:</th>
                <th scope="col">company Description:</th>
                <th scope="col">E-mail</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {companys &&
              companys.map((company, index) => (
                <tbody key={company._id}>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{company.companyName}</td>
                    <td>{company.companyDescription}</td>
                    <td>{company.email}</td>
                    <td> 
                      <button className='btn btn-danger me-1' onClick={(e) => { deleteOneComapany(e, company._id) }}>
                        <i className='fa fa-trash'></i> Delete</button>
                      <Link to={`/admin/company/update/${company._id}`} className='btn btn-success'><i className='fa fa-edit'></i> Update</Link>
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

export default ListCompany