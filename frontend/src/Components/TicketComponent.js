import React, { useState, useEffect } from "react";
import '../Styles/AccountInfo.css';
import Navbar from "./GlobalComponent/NavbarComponent/navbarcomponent";
import { axiosInstance, setAuthToken } from "../util/baseurl";
import axios from 'axios';
import '../Styles/ticket.css';

const ComplaintForm = () => {
    const [complaints, setcomplaintdata] = useState([]);
    const [replyModalVisible, setReplyModalVisible] = useState(false);
    const [newComplaint, setnewcomplaint] = useState({
        email: '',
        description: '',
        status: "Ticket Created"
    });

    const [replyData, setreplydata] = useState({
        email: '',
        description: '',
        status: "Ticket Created"
    });


    // Renamed "complaint" to "newComplaint" to avoid confusion with the "complaints" state

    const fetchComplaints = async () => {
        try {
            const response = await axiosInstance.get(`/api/complaint`);
            const data = response.data;
            setcomplaintdata(data.complaintsdata); // Changed "complaintdata" to "complaints" to match the key in the response data
        } catch (error) {
            console.error('Error fetching complaints:', error);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    const handleReplyClick = (data) => {
        setnewcomplaint({
            email: data.email,
            description: data.description,
            status: data.status,
            createdAt: data.createdAt
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setnewcomplaint(prevCustomer => ({ ...prevCustomer, [name]: value }));
    };



    const handleInputReplyChange = (e) => {
        const { name, value } = e.target;
        setreplydata(prevreply => ({ ...prevreply, [name]: value }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, description } = newComplaint; // Renamed "complaint" to "newComplaint"
        try {
            const response = await axiosInstance.post('/api/complaint', {
                email,
                description,

            });
            console.log(response.data); // Handle success or display a confirmation to the user
        } catch (error) {
            console.error('Error submitting complaint:', error);
        }
    };

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        const { email, description, status } = newComplaint; // Renamed "complaint" to "newComplaint"
        try {
            const response = await axiosInstance.post('/api/reply', {
                email,
                description,
                status

            });
            console.log(response.data); // Handle success or display a confirmation to the user
        } catch (error) {
            console.error('Error submitting reply:', error);
        }
    };



    return (
        <div>
            <Navbar />


            <button type="button" class="btn btn-primary mx-auto d-block" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                Raise a complaint
            </button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Raise a complaint</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div class="form-group">
                                    <label class="form-label" for="Email">Email</label>
                                    <input type='text' class="form-input" name='email' onChange={handleInputChange} placeholder='Email' value={newComplaint.email} />
                                    {/* Changed "Email" to "email" to match the state */}
                                </div>

                                <div class="form-group">
                                    <label class="form-label" for="complaint">Complaint</label>
                                    <textarea class="form-input" name='description' onChange={handleInputChange} placeholder='Complaint' rows={10} cols={10} value={newComplaint.description} />
                                    {/* Changed "Complaint" to "description" to match the state */}
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="complaint-table-container">
                {complaints && complaints.length > 0 && (
                    <table className="complaint-table">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.email}</td>
                                    <td>{data.createdAt}</td>
                                    <td>{data.status}</td>
                                    <td>{data.description}</td>
                                    <td><button
                                        type="button"
                                        className="btn btn-primary mx-auto d-block"
                                        data-bs-toggle="modal"
                                        data-bs-target="#complaintModal"
                                        onClick={() => handleReplyClick(data)}
                                    >
                                        View & Reply
                                    </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {(!complaints || complaints.length === 0) && (
                    <p className="no-complaints-message">No complaints available.</p>
                )}
            </div>



            <div className="modal fade" id="complaintModal" tabIndex="-1" aria-labelledby="replyModalLabel" aria-hidden="true" data-bs-show={replyModalVisible}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="replyModalLabel">Reply to Complaint</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">


                            <div className="twomodalcontainer">


                                <div className="secondsidecontainer">
                                    <div class="form-group">
                                        <label class="form-label" for="Email">Email</label>
                                        <input type='text' class="form-input" name='email' onChange={handleInputChange} placeholder='Email' value={newComplaint.email} />
                                        {/* Changed "Email" to "email" to match the state */}
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label" for="complaint">Complaint</label>
                                        <textarea class="form-input" name='description' onChange={handleInputChange} placeholder='Complaint' rows={10} cols={10} value={newComplaint.description} />
                                        {/* Changed "Complaint" to "description" to match the state */}
                                    </div>
                                </div>



                                <div className="onesidecontainer">
                                    <form onSubmit={handleReplySubmit}>
                                        <div class="form-group">
                                            <label class="form-label" for="Email">Email</label>
                                            <input type='text' class="form-input" name='email' onChange={handleInputReplyChange} placeholder='Email' value={replyData.email} />
                                            {/* Changed "Email" to "email" to match the state */}
                                        </div>

                                        <div class="form-group">
                                            <label class="form-label" for="complaint">Complaint</label>
                                            <textarea class="form-input" name='description' onChange={handleInputReplyChange} placeholder='Complaint' rows={10} cols={10} value={replyData.description} />
                                            {/* Changed "Complaint" to "description" to match the state */}
                                        </div>

                                        <div className="form-group">
                                            <div className="dropdown">
                                                <button
                                                    className="btn btn-secondary dropdown-toggle"
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    Status
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <button
                                                            className="dropdown-item"
                                                            href="#"
                                                            onClick={() => setreplydata({ status: "Ticket Checked" })}
                                                        >
                                                            Ticket Checked
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="dropdown-item"
                                                            href="#"
                                                            onClick={() => setreplydata("Ticket On-Progress")}
                                                        >
                                                            Ticket On-Progress
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="dropdown-item"
                                                            href="#"
                                                            onClick={() => setreplydata("Ticket Denied")}
                                                        >
                                                            Ticket Denied
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="dropdown-item"
                                                            href="#"
                                                            onClick={() => setreplydata("Ticket Resolved")}
                                                        >
                                                            Ticket Resolved
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="submit" class="btn btn-primary">Reply</button>
                                        </div>
                                    </form>

                                </div>




                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComplaintForm