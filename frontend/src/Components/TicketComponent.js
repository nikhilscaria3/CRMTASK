import React, { useState, useEffect, useRef } from "react";
import '../Styles/AccountInfo.css';
import Navbar from "./GlobalComponent/NavbarComponent/navbarcomponent";
import { axiosInstance, setAuthToken } from "../util/baseurl";
import '../Styles/ticket.css';

const ComplaintForm = () => {
    const [complaints, setcomplaintdata] = useState([]);
    const [replies, setReplies] = useState([]);
    const [replyModalVisible, setReplyModalVisible] = useState(false);

    const [newComplaint, setnewcomplaint] = useState({
        email: '',
        subject: "",
        description: '',
        ticketnumber: ''
    });

    const [replyData, setreplydata] = useState({
        email: '',
        status: "",
        description: '',
        ticketnumber: ''
    });

    const modalRef = useRef(null);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    // Renamed "complaint" to "newComplaint" to avoid confusion with the "complaints" state


    const fetchComplaints = async () => {
        try {
            const response = await axiosInstance.get(`/api/complaint?page=${page}&limit=${limit}`);
            const data = response.data;
            setTotalPages(data.totalPages);
            console.log(data.complaintsdata);
            setcomplaintdata(data.complaintsdata); // Changed "complaintdata" to "complaints" to match the key in the response data
        } catch (error) {
            console.error('Error fetching complaints:', error);
        }
    };

    const handlePrevClick = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextClick = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, [page, limit]);


    const handleComplaint = () => {
        setnewcomplaint({
            email: '',
            subject: "",
            description: '',
            ticketnumber: ''

        })
    }

    const handleReplyClick = (data) => {
        setnewcomplaint({
            email: data.email,
            description: data.description,
            subject: data.subject,
            status: data.status,
            ticketnumber: data.ticketnumber,
            createdAt: data.createdAt,

        });
        setreplydata({
            email: data.email,
            ticketnumber: data.ticketnumber
        })
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setnewcomplaint(prevCustomer => ({ ...prevCustomer, [name]: value }));
    };

    const closeModal = () => {
        modalRef.current.setAttribute("data-bs-target", "");
    };

    const handleInputReplyChange = (e) => {
        const { name, value } = e.target;
        setreplydata(prevreply => ({ ...prevreply, [name]: value }));
    };


    const handleRepliesData = async (data) => {
        const email = data.email;
        try {
            const response = await axiosInstance.get('/api/replies', {
                params: { email }, // Use the 'params' option to send the email as a query parameter
            });
            const responsedata = response.data;
            setReplies(responsedata.replydata);
            setReplyModalVisible(true);
        } catch (error) {
            console.error('Error fetching replies:', error);
        }
    };
    
    const handleSubmit = async (e) => {
        const { email, description, subject } = newComplaint;

        try {
            const response = await axiosInstance.post('/api/complaint', {
                email,
                description,
                subject
            });

            if (response) {
                const createdComplaint = await response.json();
                setcomplaintdata(prevComplaints => [...prevComplaints, createdComplaint]);
                setnewcomplaint({
                    email: '',
                    subject: "",
                    description: '',
                    status: "Ticket Created",
                });
                closeModal();
            }
        } catch (error) {
            console.error('Error submitting complaint:', error);
        }
    }

    const handleReplySubmit = async (e) => {
        e.preventDefault(); // Prevent the form submission

        const { description, status, email, ticketnumber } = replyData;

        try {
            const response = await axiosInstance.post('/api/reply', {
                email,
                description,
                status,
                ticketnumber
            });

            console.log(response.data); // Handle success or display a confirmation to the user

            // Optionally, you can update the state or handle other UI updates here

            // Close the reply modal
            setReplyModalVisible(false);
        } catch (error) {
            console.error('Error submitting reply:', error);
        }
    };


    return (
        <div>
            <Navbar />


            <button
                type="button"
                className="btn btn-primary mx-auto d-block me-auto"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                ref={modalRef}
                onClick={handleComplaint}
            >
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
                                    <label class="form-label" for="subject">Subject</label>
                                    <textarea class="form-input" name='subject' onChange={handleInputChange} placeholder='Subject' value={newComplaint.subject} />
                                    {/* Changed "Complaint" to "description" to match the state */}
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
                                <th>Sl No.</th>
                                <th>Email</th>
                                <th>Subject</th>
                                <th>Date</th>
                                <th>Current Status</th>
                                <th>Ticket Number</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map((data, index) => (
                                <tr key={index}>
                                    <td>{(page - 1) * limit + index + 1}</td>
                                    <td>{data.email}</td>
                                    <td>{data.subject}</td>
                                    <td>{new Date(data.createdAt).toLocaleString()}</td>
                                    <td>{data.status}</td>
                                    <td>{data.ticketnumber}</td>
                                    <td>{data.description}</td>
                                    <td>   <button
                                        type="button"
                                        className="btn btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#repliesModal"
                                        onClick={() => handleRepliesData(data)}
                                    >
                                        Replies
                                    </button>
                                    </td>
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
                <div className='paginationbuttoncontainer'>
                    <button onClick={handlePrevClick} disabled={page === 1}>Prev</button>
                    <span>{`Page ${page} of ${totalPages}`}</span>
                    <button onClick={handleNextClick} disabled={page === totalPages}>Next</button>
                </div>
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
                                        <input type='text' class="form-input" name='email' placeholder='Email' value={newComplaint.email} disabled />
                                        {/* Changed "Email" to "email" to match the state */}
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label" for="subject">Subject</label>
                                        <textarea class="form-input" name='subject' placeholder='Subject' value={newComplaint.subject} disabled />
                                        {/* Changed "Complaint" to "description" to match the state */}
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label" for="complaint">Complaint</label>
                                        <textarea class="form-input" name='description' placeholder='Complaint' rows={10} cols={10} value={newComplaint.description} disabled />
                                        {/* Changed "Complaint" to "description" to match the state */}
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label" for="status">Current Status</label>
                                        <input type='text' class="form-input" name='status' placeholder='Status' value={newComplaint.status} disabled />
                                        {/* Changed "Email" to "email" to match the state */}
                                    </div>
                                </div>



                                <div className="onesidecontainer">
                                    <form onSubmit={handleReplySubmit}>
                                        <div class="form-group">
                                            <label class="form-label" for="Email">Email</label>
                                            <input type='text' class="form-input" name='email' placeholder='Email' value={newComplaint.email} disabled />
                                            {/* Changed "Email" to "email" to match the state */}
                                        </div>

                                        <div class="form-group">
                                            <label class="form-label" for="description">Reply</label>
                                            <textarea class="form-input" name='description' onChange={handleInputReplyChange} placeholder='Reply' rows={10} cols={10} value={replyData.description} />
                                            {/* Changed "Complaint" to "description" to match the state */}
                                        </div>

                                        <div class="form-group">
                                            <label class="form-label" for="ticketnumber">Ticket Number</label>
                                            <input class="form-input" name='ticketnumber' placeholder='ticketnumber' value={newComplaint.ticketnumber} disabled />
                                            {/* Changed "Complaint" to "description" to match the state */}
                                        </div>

                                        <div class="form-group">
                                            <div className="dropdown">
                                                <button
                                                    className="btn btn-secondary dropdown-toggle"
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    {replyData ? "Status" : replyData.status}
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <button
                                                            className="dropdown-item"
                                                            href="#"
                                                            onClick={() => setreplydata({ ...replyData, status: "Ticket Checked" })}
                                                        >
                                                            Ticket Checked
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="dropdown-item"
                                                            href="#"
                                                            onClick={() => setreplydata({ ...replyData, status: "Ticket On-Progress" })}
                                                        >
                                                            Ticket On-Progress
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="dropdown-item"
                                                            href="#"
                                                            onClick={() => setreplydata({ ...replyData, status: "Ticket Denied" })}
                                                        >
                                                            Ticket Denied
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="dropdown-item"
                                                            href="#"
                                                            onClick={() => setreplydata({ ...replyData, status: "Ticket Resolved" })}
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



            <div className="modal fade" id="repliesModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Replies List</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {replies && replies.length > 0 ? (
                                <ul>
                                    {replies.map((reply, replyIndex) => (
                                        <li key={replyIndex}>
                                            <div>
                                                <strong>Email:</strong> {reply.email}
                                            </div>
                                            <div>
                                                <strong>Description:</strong> {reply.description}
                                            </div>
                                            <div>
                                                <strong>Status:</strong> {reply.status}
                                            </div>
                                            <div>
                                                <strong>Created At:</strong> {new Date(reply.createdAt).toLocaleString()}
                                            </div>
                                            <hr />
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No replies available.</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
}

export default ComplaintForm