import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import axios from 'axios';


const ListEvent = () => {
  const [events, setEvents] = useState([]);
  const handleEventList = async () => {
    try {
      const eventList = await axios.get('http://localhost:4000/api/event')
      setEvents(eventList.data)
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    handleEventList();
  }, []);

  const refreshList = () => {
    handleEventList();
  };

   const deleteOneEvent = async (e, id) => {
    try {
      await axios.delete(`http://localhost:4000/api/event/${id}`)
      handleEventList();
      refreshList();
    }
    catch (error) {
        console.log(error)
    }
  };



    return (
        <div className="row">
        <div className="col-md-12">
          <h4>Event list</h4>
          <div>
            <div className="d-grid gap-2">
              <Link to="/admin/addevent">
                <button className="btn btn-success" type="button">
                  <i className='fa fa-plus'></i> Add new event</button>
              </Link>
            </div>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">eventName</th>
                  <th scope="col">eventDescription:</th>
                  <th scope="col">startDate</th>
                  <th scope="col">endDate</th>
                  <th scope="col">startTime</th>
                  <th scope="col">price</th>
                  <th scope="col">location</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              {events&&
                events.map((event, index) => (
                  <tbody key={event._id}>
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{event.eventName}</td>
                      <td>{event.eventDescription}</td>
                      <td>{event.startDate}</td>
                      <td>{event.endDate}</td>
                      <td>{event.startTime}</td>
                      <td>{event.price}</td>
                      <td>{event.location}</td>
                      <td> 
                        <button className='btn btn-danger me-1' onClick={(e) => { deleteOneEvent(e,event._id) }}>
                          <i className='fa fa-trash'></i> Delete</button>
                        <Link to={`/admin/event/update/${event._id}`} className='btn btn-success'><i className='fa fa-edit'></i> Update</Link>
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
export default ListEvent

